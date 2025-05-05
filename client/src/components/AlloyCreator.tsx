import { useState, useEffect, DragEvent } from "react";
import MetalComponent from "./MetalComponent";
import { Metal } from "../data/metals";
import { allAlloys, Alloy } from "../data/alloys";
import { Button } from "@/components/ui/button";
import { Trash2, Beaker } from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

interface AlloyCreatorProps {
  onAlloyCreated: (alloy: Alloy) => void;
  discoveredAlloys: Alloy[];
}

const AlloyCreator: React.FC<AlloyCreatorProps> = ({ 
  onAlloyCreated,
  discoveredAlloys
}) => {
  const [selectedMetals, setSelectedMetals] = useState<Metal[]>([]);
  const [dropActive, setDropActive] = useState(false);
  const [result, setResult] = useState<{message: string, alloy?: Alloy, success: boolean} | null>(null);
  const { playHit } = useAudio();

  // Limpar o resultado quando os metais selecionados mudam
  useEffect(() => {
    setResult(null);
  }, [selectedMetals]);

  // Lidar com o evento de soltar o metal na área
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropActive(false);
    
    try {
      const metalData = JSON.parse(e.dataTransfer.getData("application/json")) as Metal;
      if (!selectedMetals.some(m => m.id === metalData.id)) {
        setSelectedMetals(prev => [...prev, metalData]);
        playHit();
      }
    } catch (err) {
      console.error("Erro ao processar metal:", err);
    }
  };

  // Remover um metal da seleção
  const removeMetal = (id: number) => {
    setSelectedMetals(prev => prev.filter(metal => metal.id !== id));
    playHit();
  };

  // Limpar todos os metais selecionados
  const clearMetals = () => {
    setSelectedMetals([]);
    setResult(null);
    playHit();
  };

  // Tentar criar uma liga com os metais selecionados
  const createAlloy = () => {
    if (selectedMetals.length < 2) {
      setResult({
        message: "Precisa de pelo menos 2 metais para criar uma liga.",
        success: false
      });
      return;
    }

    // Ordenar os IDs dos metais selecionados para comparação consistente
    const selectedIds = selectedMetals.map(m => m.id).sort((a, b) => a - b);
    
    // Procurar uma liga que corresponda aos metais selecionados
    const matchedAlloy = allAlloys.find(alloy => {
      const alloyIds = alloy.recipe.map(m => m.id).sort((a, b) => a - b);
      return (
        alloyIds.length === selectedIds.length &&
        alloyIds.every((id, index) => id === selectedIds[index])
      );
    });

    if (matchedAlloy) {
      // Verificar se a liga já foi descoberta
      const alreadyDiscovered = discoveredAlloys.some(a => a.id === matchedAlloy.id);
      
      if (alreadyDiscovered) {
        setResult({
          message: `${matchedAlloy.name} - Esta liga já foi descoberta anteriormente.`,
          alloy: matchedAlloy,
          success: true
        });
      } else {
        setResult({
          message: `Nova descoberta: ${matchedAlloy.name}! ${matchedAlloy.description}`,
          alloy: matchedAlloy,
          success: true
        });
        onAlloyCreated(matchedAlloy);
      }
    } else {
      setResult({
        message: "Combinação não resultou numa liga conhecida. Tente outra mistura!",
        success: false
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Área para soltar os metais */}
      <div 
        className={`min-h-[180px] border-2 border-dashed rounded-lg p-3 mb-2 transition-colors ${
          dropActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDropActive(true);
        }}
        onDragLeave={() => setDropActive(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-wrap gap-3 items-start justify-center">
          {selectedMetals.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <Beaker className="mx-auto h-12 w-12 mb-2 text-gray-400" />
              <p>Arraste metais para aqui para começar a misturar</p>
            </div>
          ) : (
            selectedMetals.map((metal) => (
              <div key={metal.id} className="relative group">
                <MetalComponent 
                  metal={metal} 
                  onDragStart={() => {}} 
                  isDraggable={false}
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 hover:opacity-80"
                  onClick={() => removeMetal(metal.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-4 justify-center mb-2">
        <Button
          variant="outline"
          onClick={clearMetals}
          disabled={selectedMetals.length === 0}
          className="px-6 py-2 text-base font-medium border-2 border-gray-300"
        >
          <Trash2 size={18} className="mr-1" /> 
          Limpar
        </Button>
        <Button
          onClick={createAlloy}
          disabled={selectedMetals.length < 2}
          className="px-6 py-2 text-base font-medium bg-blue-600 hover:bg-blue-700"
        >
          <Beaker size={18} className="mr-1" />
          Combinar
        </Button>
      </div>

      {/* Mensagem de resultado */}
      {result && (
        <div className={`p-3 rounded-md ${
          result.success ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {result.message}
        </div>
      )}
    </div>
  );
};

export default AlloyCreator;
