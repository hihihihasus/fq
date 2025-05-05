import { useState, useEffect } from "react";
import LabInterface from "./components/LabInterface";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Alloy } from "./data/alloys";
import "@fontsource/inter";
import "./index.css";

function App() {
  // Estado para as ligas descobertas
  const [discoveredAlloys, setDiscoveredAlloys] = useState<Alloy[]>([]);

  // Função para adicionar uma liga à lista de descobertas
  const addDiscoveredAlloy = (alloy: Alloy) => {
    if (!discoveredAlloys.some(a => a.id === alloy.id)) {
      setDiscoveredAlloys(prev => [...prev, alloy]);
    }
  };

  // Efeito para carregar ligas descobertas do localStorage (se existirem)
  useEffect(() => {
    const savedAlloys = localStorage.getItem('discoveredAlloys');
    if (savedAlloys) {
      setDiscoveredAlloys(JSON.parse(savedAlloys));
    }
  }, []);

  // Efeito para salvar ligas descobertas no localStorage
  useEffect(() => {
    localStorage.setItem('discoveredAlloys', JSON.stringify(discoveredAlloys));
  }, [discoveredAlloys]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-4 overflow-auto">
        <LabInterface 
          discoveredAlloys={discoveredAlloys} 
          addDiscoveredAlloy={addDiscoveredAlloy} 
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
