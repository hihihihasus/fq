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
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-slate-500 mt-1">
          Progresso: {discoveredAlloys.length} de {allAlloys.length} ligas descobertas
        </p>
      </div>

      {discoveredAlloys.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          <p>Ainda não descobriu nenhuma liga. Comece a experimentar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {discoveredAlloys.map((alloy) => (
            <div key={alloy.id} className="bg-white p-3 rounded-md shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="mb-2">
                {/* Exibir imagem da liga */}
                <div 
                  className="w-full h-32 bg-center bg-no-repeat bg-contain mx-auto mb-2"
                  style={{ backgroundImage: `url(${alloy.image})` }}
                ></div>
                <h3 className="font-semibold text-slate-700 text-center">{alloy.name}</h3>
              </div>
              <div className="text-xs text-slate-600">
                <p><span className="font-semibold">Composição:</span> {alloy.recipe.map(m => m.name).join(" + ")}</p>
                <p className="mt-1"><span className="font-semibold">Aplicação:</span> {alloy.application}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlloyDisplay;
