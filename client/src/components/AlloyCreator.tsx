import { useState, useEffect, DragEvent } from "react";
import MetalComponent from "./MetalComponent";
import { Metal } from "../data/metals";
import { allAlloys, Alloy } from "../data/alloys";
import { Button } from "@/components/ui/button";
import { Trash2, Beaker } from "lucide-react";
import { audioService } from "@/lib/audio-service";
import AlloyDiscoveryModal from "./AlloyDiscoveryModal";

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
  const [discoveredAlloy, setDiscoveredAlloy] = useState<Alloy | null>(null);

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
        audioService.playClick();
      }
    } catch (err) {
      console.error("Erro ao processar metal:", err);
    }
  };

  // Remover um metal da seleção
  const removeMetal = (id: number) => {
    setSelectedMetals(prev => prev.filter(metal => metal.id !== id));
    audioService.playClick();
  };

  // Limpar todos os metais selecionados
  const clearMetals = () => {
    setSelectedMetals([]);
    setResult(null);
    audioService.playClick();
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
        // Mostrar o modal com a nova descoberta
        setDiscoveredAlloy(matchedAlloy);
        // Som será tocado pelo modal de descoberta
        setResult({
          message: `Nova descoberta: ${matchedAlloy.name}!`,
          alloy: matchedAlloy,
          success: true
        });
        // O onAlloyCreated é chamado quando o modal é fechado
      }
    } else {
      setResult({
        message: "Combinação não resultou numa liga conhecida. Tente outra mistura!",
        success: false
      });
    }
  };

  // Função para fechar o modal e adicionar a liga à lista de descobertas
  const handleCloseModal = () => {
    if (discoveredAlloy) {
      onAlloyCreated(discoveredAlloy);
      setDiscoveredAlloy(null);
      // Opcionalmente limpar os metais selecionados após uma descoberta
      setSelectedMetals([]);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Área para soltar os metais */}
      <div 
        className={`min-h-[120px] border-2 border-dashed rounded-lg p-2 mb-2 transition-colors ${
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
            <div className="text-gray-500 text-center py-4">
              <Beaker className="mx-auto h-8 w-8 mb-1 text-gray-400" />
              <p className="text-sm">Arraste metais para aqui</p>
            </div>
          ) : (
            selectedMetals.map((metal) => (
              <div key={metal.id} className="relative group">
                <MetalComponent 
                  metal={metal} 
                  onDragStart={() => {}} 
                  isDraggable={false}
                  scale={0.9}
                />
                <button
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-100 hover:opacity-80"
                  onClick={() => removeMetal(metal.id)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botões de ação e resultado */}
      <div className="flex items-center gap-2 justify-center mb-1">
        <Button
          variant="outline"
          onClick={clearMetals}
          disabled={selectedMetals.length === 0}
          size="sm"
          className="text-xs font-medium"
        >
          <Trash2 size={14} className="mr-1" /> 
          Limpar
        </Button>
        <Button
          onClick={createAlloy}
          disabled={selectedMetals.length < 2}
          size="sm"
          className="text-xs font-medium bg-blue-600 hover:bg-blue-700"
        >
          <Beaker size={14} className="mr-1" />
          Combinar
        </Button>
      </div>

      {/* Mensagem de resultado */}
      {result && (
        <div className={`p-2 rounded-md text-xs mt-1 ${
          result.success ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {result.message}
        </div>
      )}

      {/* Modal de descoberta de liga */}
      <AlloyDiscoveryModal 
        alloy={discoveredAlloy} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AlloyCreator;
