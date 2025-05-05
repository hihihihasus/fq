import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

const Navbar: React.FC = () => {
  const { isMuted, toggleMute } = useAudio();
  const [isCopyrightVisible, setIsCopyrightVisible] = useState(false);

  const handleSoundToggle = () => {
    toggleMute();
  };

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold">Ligas Metálicas</span>
          <span className="ml-2 text-xs px-2 py-1 bg-amber-500 text-white rounded-full">Educativo</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-slate-700"
            onClick={handleSoundToggle}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
