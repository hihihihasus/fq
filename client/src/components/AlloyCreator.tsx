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
    <div className="flex flex-col h-full">
      {/* Área para soltar os metais */}
      <div 
        className={`flex-1 min-h-[150px] border-2 border-dashed rounded-lg p-3 mb-3 transition-colors ${
          dropActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDropActive(true);
        }}
        onDragLeave={() => setDropActive(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-wrap gap-2 items-start justify-center">
          {selectedMetals.length === 0 ? (
            <div className="text-slate-500 text-center p-4">
              <Beaker className="mx-auto h-8 w-8 mb-2 text-slate-400" />
              <p className="text-sm">Arraste metais para aqui para começar a misturar</p>
            </div>
          ) : (
            selectedMetals.map((metal) => (
              <div key={metal.id} className="relative group">
                <MetalComponent 
                  metal={metal} 
                  onDragStart={() => {}} 
                  isDraggable={false}
                  scale={0.8}
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeMetal(metal.id)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={clearMetals}
          disabled={selectedMetals.length === 0}
          className="w-28 text-sm py-1 h-8"
        >
          Limpar
        </Button>
        <Button
          onClick={createAlloy}
          disabled={selectedMetals.length < 2}
          className="w-28 text-sm py-1 h-8"
        >
          Combinar
        </Button>
      </div>

      {/* Mensagem de resultado */}
      {result && (
        <div className={`mt-3 p-2 rounded-md text-sm ${
          result.success ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {result.message}
        </div>
      )}
    </div>
  );
};

export default AlloyCreator;
