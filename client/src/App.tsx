import { useState, useEffect } from "react";
import LabInterface from "./components/LabInterface";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CelebrationModal from "./components/CelebrationModal";
import { Alloy, allAlloys } from "./data/alloys";
import "@fontsource/inter";
import "./index.css";

function App() {
  // Estado para as ligas descobertas
  const [discoveredAlloys, setDiscoveredAlloys] = useState<Alloy[]>([]);
  // Estado para controlar a exibição do modal de celebração
  const [showCelebration, setShowCelebration] = useState(false);

  // Verifica se todas as ligas foram descobertas
  const allDiscovered = discoveredAlloys.length === allAlloys.length;

  // Função para adicionar uma liga à lista de descobertas
  const addDiscoveredAlloy = (alloy: Alloy) => {
    if (!discoveredAlloys.some(a => a.id === alloy.id)) {
      const newDiscoveredAlloys = [...discoveredAlloys, alloy];
      setDiscoveredAlloys(newDiscoveredAlloys);
      
      // Verificar se foi a última liga a ser descoberta
      if (newDiscoveredAlloys.length === allAlloys.length) {
        // Atrasar um pouco para mostrar o modal de celebração
        setTimeout(() => setShowCelebration(true), 800);
      }
    }
  };
  
  // Função para resetar todas as descobertas
  const resetAllDiscoveries = () => {
    setDiscoveredAlloys([]);
    localStorage.removeItem('discoveredAlloys');
  };

  // Fechar o modal de celebração
  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  // Efeito para carregar ligas descobertas do localStorage (se existirem)
  useEffect(() => {
    const savedAlloys = localStorage.getItem('discoveredAlloys');
    if (savedAlloys) {
      const parsedAlloys = JSON.parse(savedAlloys);
      setDiscoveredAlloys(parsedAlloys);
      
      // Verificar se todas as ligas já foram descobertas anteriormente
      if (parsedAlloys.length === allAlloys.length) {
        // Mostrar a celebração com um pequeno atraso
        setTimeout(() => setShowCelebration(true), 1000);
      }
    }
  }, []);

  // Efeito para salvar ligas descobertas no localStorage
  useEffect(() => {
    localStorage.setItem('discoveredAlloys', JSON.stringify(discoveredAlloys));
  }, [discoveredAlloys]);

  return (
    <div className="bg-gray-100 min-h-screen max-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-3 py-1 flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 90px)' }}>
        <LabInterface 
          discoveredAlloys={discoveredAlloys} 
          addDiscoveredAlloy={addDiscoveredAlloy}
          resetAllDiscoveries={resetAllDiscoveries}
        />
      </main>
      <Footer />
      
      {/* Modal de celebração para quando todas as ligas forem descobertas */}
      <CelebrationModal 
        isVisible={showCelebration}
        onClose={handleCloseCelebration}
      />
    </div>
  );
}

export default App;
