export interface Metal {
  id: number;
  name: string;
  symbol: string;
  color: string;
  borderColor?: string;
}

// Lista de metais disponíveis para o jogo
export const availableMetals: Metal[] = [
  {
    id: 1,
    name: "Ferro",
    symbol: "Fe",
    color: "#8c8c8c",
    borderColor: "#555555"
  },
  {
    id: 2,
    name: "Cobre",
    symbol: "Cu",
    color: "#b87333",
    borderColor: "#8c571f"
  },
  {
    id: 3,
    name: "Estanho",
    symbol: "Sn",
    color: "#b4b4b4",
    borderColor: "#8a8a8a"
  },
  {
    id: 4,
    name: "Zinco",
    symbol: "Zn",
    color: "#c0c0c0",
    borderColor: "#9a9a9a"
  },
  {
    id: 5,
    name: "Níquel",
    symbol: "Ni",
    color: "#a6a6a6",
    borderColor: "#7f7f7f"
  },
  {
    id: 6,
    name: "Alumínio",
    symbol: "Al",
    color: "#d9d9d9",
    borderColor: "#a3a3a3"
  },
  {
    id: 7,
    name: "Crómio",
    symbol: "Cr",
    color: "#a8a8a8",
    borderColor: "#7d7d7d"
  },
  {
    id: 8,
    name: "Carbono",
    symbol: "C",
    color: "#222222",
    borderColor: "#000000"
  },
  {
    id: 9,
    name: "Manganês",
    symbol: "Mn",
    color: "#9c9c9c",
    borderColor: "#767676"
  },
  {
    id: 10,
    name: "Silício",
    symbol: "Si",
    color: "#666666",
    borderColor: "#444444"
  }
];
