export interface Tire {
  code: string;
  brand: string;
  model: string;
  size: string; // e.g. "175-70-13" or "245-75-16"
  price: number;
  branch: string; // e.g. "Santiago" | "Querétaro" | "San Juan del Río"
  stock: number;
  notes?: string;
  image?: string;
}

export interface Rim {
  id: number;
  size: string; // e.g. "14x8" | "15x10" | "17x8-9"
  diameter: number; // 14, 15, 16, 17, 18
  boltPattern: string; // e.g. "6-139.7" | "4-100" | "5-100" | "5-100 / 5-112"
  price: number;
  features?: string; // e.g. "Progresivos" | "Deportivo Negro"
  image?: string;
}

export interface QuoteItem {
  id: string; // 'tire-[code]' or 'rim-[id]'
  type: 'tire' | 'rim';
  name: string;
  detail: string;
  price: number;
  quantity: number;
  branch?: string;
}
