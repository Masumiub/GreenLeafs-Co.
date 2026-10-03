export interface PlantProduct {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  price: number; // in cents
  compareAtPrice?: number | null;
  category: "indoor" | "rare" | "pet-safe" | "large" | "easy-care" | "planters" | string;
  tags: string[];
  shortDescription: string;
  description: string;
  lightRequirement: "low" | "indirect" | "bright" | "direct" | string;
  waterFrequency: string;
  humidity: string;
  careLevel: "beginner" | "intermediate" | "master" | string;
  petSafe: boolean;
  sizes: string[];
  potOptions: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  badge?: string | null;
}

export interface CartItem {
  id: string; // unique item id: productId + size + pot
  productId: string;
  slug: string;
  name: string;
  botanicalName: string;
  price: number;
  image: string;
  size: string;
  pot: string;
  quantity: number;
  petSafe: boolean;
}

export interface ReviewItem {
  id: number;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  experienceLevel: string;
  createdAt: string;
}

export interface OrderItemRecord {
  productId: string;
  name: string;
  image: string;
  size: string;
  pot: string;
  quantity: number;
  price: number;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  deliverySpeed: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  promoCode?: string | null;
  status: string;
  orderNotes?: string | null;
  items: OrderItemRecord[];
  createdAt: string;
}
