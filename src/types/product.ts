export type WoodType = "Solid Teak" | "Sheesham (Indian Rosewood)" | "Solid Oak" | "Acacia Wood" | "Engineered Wood";
export type FinishType = "Natural Walnut" | "Honey Teak" | "Dark Mahogany" | "Matte Oak" | "Charcoal Black";
export type RoomCategory = "Living Room" | "Dining Room" | "Bedroom" | "Study & Office" | "Custom Handcrafted";

export interface ProductDimensions {
  length: number; // in inches
  width: number;
  height: number;
  unit: "in" | "cm";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: RoomCategory;
  price: number;
  originalPrice?: number;
  woodType: WoodType;
  finish: FinishType;
  dimensions: ProductDimensions;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  leadTimeDays: number;
  warrantyYears: number;
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  tags: string[];
}
