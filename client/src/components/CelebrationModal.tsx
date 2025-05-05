import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { audioService } from "../lib/audio-service";

interface CelebrationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ 
  isVisible, 
  onClose 
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Efeito para lançar confetti e tocar o som quando o modal ficar visível
  useEffect(() => {
    if (isVisible) {
      // Tocar o som de vitória
      audioService.playVictory();
      
      // Lançar confetti quando o modal aparecer
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const launchConfetti = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(launchConfetti);
        }
      };

      launchConfetti();
      setTimeout(() => setAnimationComplete(true), 500);
    } else {
      setAnimationComplete(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
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
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 text-white">
            <h2 className="text-2xl font-bold">Missão Completa!</h2>
            <p className="text-sm text-indigo-100">Todas as ligas metálicas foram descobertas</p>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 10, 0] }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring"
                }}
                className="w-20 h-20 mb-4 text-yellow-500"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {animationComplete && (
                <motion.div
                  className="space-y-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.p 
                    className="text-xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    És o mestre das ligas metálicas, os meus parabéns!!!
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    A tua professora de física e química deve estar orgulhosa!!
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <Button 
                onClick={onClose}
                className="px-8 py-2 font-medium bg-indigo-600 hover:bg-indigo-700"
              >
                Continuar
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CelebrationModal;