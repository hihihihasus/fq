import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { audioService } from "@/lib/audio-service";

const Navbar: React.FC = () => {
  // Estado local para acompanhar o estado de mudo do áudio
  const [isMuted, setIsMuted] = useState(audioService.muted);
  const [isCopyrightVisible, setIsCopyrightVisible] = useState(false);

  const handleSoundToggle = () => {
    // Utilizar o serviço de áudio para alternar o som
    const newMutedState = audioService.toggleMute();
    setIsMuted(newMutedState);
    // Reproduzir um som de clique se o som não estiver mudo
    if (!newMutedState) {
      audioService.playClick();
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg font-bold">Rodrigo Costa</span>
          <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-amber-500 text-white rounded-full">3TIS</span>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-gray-700 p-1 h-8"
            onClick={handleSoundToggle}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
