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
      <div className="mb-3">
        <Progress value={progress} className="h-3 bg-gray-200" />
        <p className="text-sm text-gray-500 mt-1">
          Progresso: {discoveredAlloys.length} de {allAlloys.length} ligas descobertas
        </p>
      </div>

      {discoveredAlloys.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>Ainda não descobriu nenhuma liga. Comece a experimentar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {discoveredAlloys.map((alloy) => (
            <div key={alloy.id} className="bg-white p-3 rounded-md shadow border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-2">
                {/* Exibir imagem da liga */}
                <div className="w-full h-24 overflow-hidden rounded-md mb-1">
                  <img 
                    src={alloy.image} 
                    alt={alloy.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-700 text-center text-sm">{alloy.name}</h3>
              </div>
              <div className="text-xs text-gray-600">
                <p className="mb-1"><span className="font-semibold">Composição:</span> {alloy.recipe.map(m => m.name).join(" + ")}</p>
                <p><span className="font-semibold">Aplicação:</span> {alloy.application}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlloyDisplay;
