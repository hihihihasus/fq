import { Alloy } from "../data/alloys";
import { Progress } from "@/components/ui/progress";

interface AlloyDisplayProps {
  discoveredAlloys: Alloy[];
  allAlloys: Alloy[];
}

const AlloyDisplay: React.FC<AlloyDisplayProps> = ({ 
  discoveredAlloys, 
  allAlloys 
}) => {
  const progress = (discoveredAlloys.length / allAlloys.length) * 100;

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <Progress value={progress} className="h-2 bg-gray-200" />
        <p className="text-xs text-gray-500 mt-0.5">
          Progresso: {discoveredAlloys.length} de {allAlloys.length} ligas descobertas
        </p>
      </div>

      {discoveredAlloys.length === 0 ? (
        <div className="text-center py-3 text-gray-500">
          <p className="text-xs">Ainda não descobriu nenhuma liga. Comece a experimentar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {discoveredAlloys.map((alloy) => (
            <div key={alloy.id} className="bg-white p-2 rounded-md shadow border border-gray-200 hover:shadow-md transition-shadow flex">
              {/* Imagem da liga */}
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md mr-2">
                <img 
                  src={alloy.image} 
                  alt={alloy.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Informações da liga */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-700 text-sm">{alloy.name}</h3>
                <div className="text-xs text-gray-600">
                  <p className="mb-0.5"><span className="font-semibold">Composição:</span> {alloy.recipe.map(m => m.name).join(" + ")}</p>
                  <p><span className="font-semibold">Aplicação:</span> {alloy.application}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlloyDisplay;
