import { useState } from "react";
import MetalComponent from "./MetalComponent";
import AlloyCreator from "./AlloyCreator";
import AlloyDisplay from "./AlloyDisplay";
import HelpButton from "./HelpButton";
import { availableMetals } from "../data/metals";
import { allAlloys, Alloy } from "../data/alloys";
import { useAudio } from "@/lib/stores/useAudio";

interface LabInterfaceProps {
  discoveredAlloys: Alloy[];
  addDiscoveredAlloy: (alloy: Alloy) => void;
}

const LabInterface: React.FC<LabInterfaceProps> = ({ 
  discoveredAlloys, 
  addDiscoveredAlloy 
}) => {
  const [selectedMetal, setSelectedMetal] = useState<null | any>(null);
  const [showRecipe, setShowRecipe] = useState<boolean>(false);
  const { playHit, playSuccess } = useAudio();

  // Função para lidar com o sucesso de criar uma liga
  const handleAlloyCreated = (alloy: Alloy) => {
    addDiscoveredAlloy(alloy);
    playSuccess();
  };

  // Função para iniciar o arrasto do metal
  const handleDragStart = (metal: any) => {
    setSelectedMetal(metal);
    playHit();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 rounded-lg px-6 py-4 shadow-lg">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Laboratório de Ligas Metálicas</h1>
          <p className="text-gray-600">
            Descubra as 5 ligas metálicas combinando diferentes metais. 
            Use o botão de ajuda (?) para ver as receitas das ligas que faltam descobrir.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Painel de metais disponíveis */}
          <div className="bg-white p-4 rounded-md shadow-md md:w-1/3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Metais Disponíveis</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="flex-1 bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-700">Área de Trabalho</h2>
              <HelpButton 
                showRecipe={showRecipe} 
                setShowRecipe={setShowRecipe} 
                discoveredAlloys={discoveredAlloys}
              />
            </div>
            <AlloyCreator
              onAlloyCreated={handleAlloyCreated}
              discoveredAlloys={discoveredAlloys}
            />
          </div>
        </div>

        {/* Área de ligas descobertas */}
        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ligas Descobertas ({discoveredAlloys.length} de {allAlloys.length})
          </h2>
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
