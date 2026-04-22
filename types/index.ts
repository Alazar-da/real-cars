// types/index.ts
export interface Media {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string; // For video thumbnails
}

export interface Car {
  id: string;
  name: string;
  description: string;
  price?: number;
  coverImage: string; // Main cover image
  media: Media[]; // Array of images and videos
  bodyType: string;
  featured: boolean;
  createdAt: string;
  brand: string;
  model: string;
  year: number;
  mileage?: string;
  transmission: string;
  engine: string;
  fuelType: string;
  condition: "Brand New" | "Used";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  carId?: string;
  createdAt: Date;
}

// Utility function to format price in Ethiopian Birr
export const formatPrice = (price?: number): string => {
  if (!price) return "Contact for Price";
  return new Intl.NumberFormat('en-US').format(price) + " Birr";
};