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
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto">
      <div className="bg-[url('../assets/lab-bg.svg')] bg-cover bg-center rounded-lg p-4 shadow-lg">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Laboratório de Ligas Metálicas</h1>
          <p className="text-sm sm:text-base text-slate-600">
            Descubra as 5 ligas metálicas combinando diferentes metais. 
            Use o botão de ajuda (?) para ver as receitas das ligas que faltam descobrir.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Painel de metais disponíveis */}
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md shadow-md lg:w-1/3">
            <h2 className="text-lg font-semibold text-slate-700 mb-2">Metais Disponíveis</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {availableMetals.map((metal) => (
                <MetalComponent 
                  key={metal.id} 
                  metal={metal} 
                  onDragStart={handleDragStart} 
                  scale={0.9}
                />
              ))}
            </div>
          </div>

          {/* Área de criação de ligas */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm p-3 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-slate-700">Área de Trabalho</h2>
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
        <div className="mt-4 bg-white/80 backdrop-blur-sm p-3 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
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
