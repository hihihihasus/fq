import { FC, DragEvent } from "react";
import { Metal } from "../data/metals";
import { cn } from "@/lib/utils";

interface MetalComponentProps {
  metal: Metal;
  onDragStart: (metal: Metal) => void;
  scale?: number;
  className?: string;
  isDraggable?: boolean;
}

const MetalComponent: FC<MetalComponentProps> = ({ 
  metal, 
  onDragStart, 
  scale = 1, 
  className = "",
  isDraggable = true 
}) => {
  // Função para manipular o início do arrasto
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    
    e.dataTransfer.setData("application/json", JSON.stringify(metal));
    onDragStart(metal);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-2 border-2 rounded-md transition-transform hover:scale-105",
        isDraggable && "cursor-grab active:cursor-grabbing",
        className
      )}
      style={{ 
        backgroundColor: metal.color,
        borderColor: metal.borderColor || 'darkgray',
        width: `${64 * scale}px`,
        height: `${64 * scale}px`
      }}
      draggable={isDraggable}
      onDragStart={handleDragStart}
    >
      <div className="text-center font-bold text-white" style={{ fontSize: `${18 * scale}px` }}>{metal.symbol}</div>
      <div className="text-white mt-1" style={{ fontSize: `${10 * scale}px` }}>{metal.name}</div>
    </div>
  );
};

export default MetalComponent;
