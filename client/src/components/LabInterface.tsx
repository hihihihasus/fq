import { useState } from "react";
import MetalComponent from "./MetalComponent";
import AlloyCreator from "./AlloyCreator";
import AlloyDisplay from "./AlloyDisplay";
import HelpButton from "./HelpButton";
import { availableMetals } from "../data/metals";
import { allAlloys, Alloy } from "../data/alloys";
import { audioService } from "@/lib/audio-service";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface LabInterfaceProps {
  discoveredAlloys: Alloy[];
  addDiscoveredAlloy: (alloy: Alloy) => void;
  resetAllDiscoveries: () => void;
}

const LabInterface: React.FC<LabInterfaceProps> = ({ 
  discoveredAlloys, 
  addDiscoveredAlloy,
  resetAllDiscoveries
}) => {
  const [selectedMetal, setSelectedMetal] = useState<null | any>(null);
  const [showRecipe, setShowRecipe] = useState<boolean>(false);

  // Função para lidar com o sucesso de criar uma liga
  const handleAlloyCreated = (alloy: Alloy) => {
    addDiscoveredAlloy(alloy);
    // O som agora é tocado diretamente pelo modal de descoberta
  };

  // Função para iniciar o arrasto do metal
  const handleDragStart = (metal: any) => {
    setSelectedMetal(metal);
    audioService.playClick();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 rounded-lg px-3 py-2 shadow-lg flex flex-col h-full">
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Laboratório de Ligas Metálicas</h1>
            <HelpButton 
              showRecipe={showRecipe} 
              setShowRecipe={setShowRecipe} 
              discoveredAlloys={discoveredAlloys}
            />
          </div>
          <p className="text-gray-600 text-xs">
            Descubra as 5 ligas metálicas combinando diferentes metais.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 flex-grow">
          {/* Painel de metais disponíveis */}
          <div className="bg-white p-2 rounded-md shadow-md md:w-1/3">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Metais Disponíveis</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {availableMetals.map((metal) => (
                <MetalComponent 
                  key={metal.id} 
                  metal={metal} 
                  onDragStart={handleDragStart} 
                />
              ))}
            </div>
          </div>

          {/* Área de criação de ligas */}
          <div className="flex-1 bg-white p-2 rounded-md shadow-md">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Área de Trabalho</h2>
            <AlloyCreator
              onAlloyCreated={handleAlloyCreated}
              discoveredAlloys={discoveredAlloys}
            />
          </div>
        </div>

        {/* Área de ligas descobertas */}
        <div className="mt-3 bg-white p-2 rounded-md shadow-md overflow-y-auto" style={{ maxHeight: 'calc(100vh - 350px)', minHeight: '150px' }}>
          <div className="flex justify-between items-center mb-1 sticky top-0 bg-white z-10">
            <h2 className="text-sm font-semibold text-gray-700">
              Ligas Descobertas ({discoveredAlloys.length} de {allAlloys.length})
            </h2>
            <Button
              variant="destructive"
              size="sm"
              onClick={resetAllDiscoveries}
              className="h-6 px-2 text-xs flex items-center gap-1"
              title="Reiniciar descobertas"
              disabled={discoveredAlloys.length === 0}
            >
              <RotateCcw size={12} /> Reset
            </Button>
          </div>
          <AlloyDisplay 
            discoveredAlloys={discoveredAlloys} 
            allAlloys={allAlloys}
          />
        </div>
      </div>
    </div>
  );
};

export default LabInterface;
