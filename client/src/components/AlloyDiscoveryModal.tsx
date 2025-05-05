import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alloy } from "../data/alloys";
import { audioService } from "../lib/audio-service";

interface AlloyDiscoveryModalProps {
  alloy: Alloy | null;
  onClose: () => void;
}

const AlloyDiscoveryModal: React.FC<AlloyDiscoveryModalProps> = ({ 
  alloy, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Efeito para controlar a animação e tocar o som
  useEffect(() => {
    if (alloy) {
      setIsVisible(true);
      // Tocar o som de descoberta
      audioService.playDiscovery();
    } else {
      setIsVisible(false);
    }
  }, [alloy]);

  if (!alloy) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
          >
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
              <h2 className="text-xl font-bold">Nova Descoberta!</h2>
              <p className="text-sm text-blue-100">Você criou uma nova liga metálica</p>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <div className="flex flex-col items-center mb-4">
                <motion.div
                  className="w-40 h-40 mb-3 overflow-hidden rounded-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={alloy.image} 
                    alt={alloy.name} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-gray-800 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {alloy.name}
                </motion.h3>
              </div>

              <motion.div
                className="space-y-3 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <h4 className="font-semibold text-gray-700">Composição:</h4>
                  <p className="text-sm text-gray-600">{alloy.recipe.map(m => m.name).join(" + ")}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Descrição:</h4>
                  <p className="text-sm text-gray-600">{alloy.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Aplicações:</h4>
                  <p className="text-sm text-gray-600">{alloy.application}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button 
                  onClick={onClose}
                  className="px-8 py-2 font-medium bg-blue-600 hover:bg-blue-700"
                >
                  Continuar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlloyDiscoveryModal;