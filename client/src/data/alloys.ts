import { Metal, availableMetals } from "./metals";
import alloy1 from "../assets/alloy1.svg";
import alloy2 from "../assets/alloy2.svg";
import alloy3 from "../assets/alloy3.svg";
import alloy4 from "../assets/alloy4.svg";
import alloy5 from "../assets/alloy5.svg";

export interface Alloy {
  id: number;
  name: string;
  recipe: Metal[];
  description: string;
  application: string;
  image: string;
}

// Funções de ajuda para recuperar metais pelo ID
const getMetalById = (id: number): Metal => {
  const metal = availableMetals.find(m => m.id === id);
  if (!metal) throw new Error(`Metal com ID ${id} não encontrado`);
  return metal;
};

// Definição das 5 ligas metálicas a serem descobertas
export const allAlloys: Alloy[] = [
  {
    id: 1,
    name: "Aço Carbono",
    recipe: [getMetalById(1), getMetalById(8)], // Ferro + Carbono
    description: "Liga de ferro com pequenas quantidades de carbono, que aumenta a resistência à deformação.",
    application: "Construção, ferramentas, automóveis",
    image: alloy1
  },
  {
    id: 2,
    name: "Bronze",
    recipe: [getMetalById(2), getMetalById(3)], // Cobre + Estanho
    description: "Liga de cobre e estanho, mais dura que o cobre puro e com melhor resistência à corrosão.",
    application: "Esculturas, moedas, instrumentos musicais",
    image: alloy2
  },
  {
    id: 3,
    name: "Latão",
    recipe: [getMetalById(2), getMetalById(4)], // Cobre + Zinco
    description: "Liga de cobre e zinco, com coloração amarela característica e boa maleabilidade.",
    application: "Instrumentos, decoração, canalização",
    image: alloy3
  },
  {
    id: 4,
    name: "Aço Inoxidável",
    recipe: [getMetalById(1), getMetalById(7), getMetalById(5)], // Ferro + Crómio + Níquel
    description: "Liga altamente resistente à corrosão devido à adição de crómio e níquel.",
    application: "Cutelaria, equipamentos médicos, construção",
    image: alloy4
  },
  {
    id: 5,
    name: "Duralumínio",
    recipe: [getMetalById(6), getMetalById(2), getMetalById(9), getMetalById(10)], // Alumínio + Cobre + Manganês + Silício
    description: "Liga de alumínio endurecida com cobre, manganês e silício, mais resistente que o alumínio puro.",
    application: "Aeronáutica, automóveis, peças de alta resistência",
    image: alloy5
  }
];
