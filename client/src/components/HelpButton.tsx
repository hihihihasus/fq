import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Info,
  X
} from "lucide-react";
import { Alloy, allAlloys } from "../data/alloys";
import { Metal } from "../data/metals";
import MetalComponent from "./MetalComponent";

interface HelpButtonProps {
  showRecipe: boolean;
  setShowRecipe: (show: boolean) => void;
  discoveredAlloys: Alloy[];
}

const HelpButton: React.FC<HelpButtonProps> = ({ 
  showRecipe, 
  setShowRecipe,
  discoveredAlloys
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const toggleHelp = () => {
    // Se o modal estiver fechado, abrimos ele em vez de mostrar as receitas na página principal
    if (!showRecipeModal) {
      setShowRecipeModal(true);
    } else {
      setShowRecipeModal(false);
    }
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  // Filtrar as ligas que ainda não foram descobertas
  const undiscoveredAlloys = allAlloys.filter(
    alloy => !discoveredAlloys.some(a => a.id === alloy.id)
  );

  return (
    <div className="flex items-center gap-2">
      {/* Modal de Instruções */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
            <Button 
              className="absolute right-2 top-2"
              variant="ghost"
              size="sm"
              onClick={toggleInstructions}
            >
              <X size={18} />
            </Button>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Instruções do Jogo</h2>
            
            <div className="space-y-4 text-slate-700">
              <p>
                Bem-vindo ao Laboratório de Ligas Metálicas! Neste jogo, o seu objetivo é descobrir 
                5 ligas metálicas específicas.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800">Como jogar:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Arraste metais da lista de "Metais Disponíveis" para a área de trabalho.</li>
                <li>Combine dois ou mais metais para tentar criar uma liga.</li>
                <li>Clique no botão "Combinar" para ver se descobriu uma liga válida.</li>
                <li>Se precisar de ajuda, clique no botão de ajuda (?) para ver as receitas das ligas por descobrir.</li>
              </ol>
              
              <p>
                À medida que for descobrindo ligas, elas serão adicionadas à sua coleção na 
                parte inferior do ecrã. O objetivo é descobrir todas as 5 ligas!
              </p>
              
              <p>
                Algumas ligas são mais complexas e requerem 3 ou mais metais, por isso 
                experimente diferentes combinações!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Receitas */}
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-3 relative overflow-y-auto max-h-[80vh]">
            <Button 
              className="absolute right-1 top-1"
              variant="ghost"
              size="sm"
              onClick={() => setShowRecipeModal(false)}
            >
              <X size={14} />
            </Button>
            
            <h2 className="text-lg font-bold text-amber-800 mb-2">Receitas a Descobrir</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {undiscoveredAlloys.length === 0 ? (
                <p className="text-green-600 font-medium col-span-full text-center py-3 text-sm">
                  Parabéns! Você já descobriu todas as ligas possíveis!
                </p>
              ) : (
                undiscoveredAlloys.map(alloy => (
                  <div key={alloy.id} className="bg-amber-50 p-2 rounded-md shadow border border-amber-200">
                    <h3 className="text-sm font-semibold text-amber-800">{alloy.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-amber-700 font-semibold">Composição:</span>
                      <div className="flex flex-wrap gap-0.5">
                        {alloy.recipe.map((metal: Metal, index: number) => (
                          <div key={metal.id} className="w-6 h-6 flex items-center justify-center">
                            <div 
                              className="w-5 h-5 rounded-full text-[9px] font-semibold flex items-center justify-center" 
                              style={{ backgroundColor: metal.color, color: "#333", border: `1px solid ${metal.borderColor || 'gray'}` }}
                            >
                              {metal.symbol}
                            </div>
                            {index < alloy.recipe.length - 1 && <span className="text-amber-700 text-xs ml-0.5">+</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-700">
                      <span className="font-semibold">Aplicação:</span> {alloy.application}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleInstructions}
        className="rounded-full h-7 w-7"
        title="Instruções"
      >
        <Info className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleHelp}
        className={`rounded-full h-7 w-7 ${showRecipeModal ? 'bg-amber-100 text-amber-700' : ''}`}
        title="Ver receitas"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default HelpButton;
