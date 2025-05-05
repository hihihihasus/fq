import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Info,
  X
} from "lucide-react";
import { Alloy } from "../data/alloys";

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

  const toggleHelp = () => {
    setShowRecipe(!showRecipe);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="flex items-center gap-2">
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

      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleInstructions}
        className="rounded-full"
      >
        <Info className="h-5 w-5" />
      </Button>

      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleHelp}
        className={`rounded-full ${showRecipe ? 'bg-amber-100 border-amber-300' : ''}`}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HelpButton;
