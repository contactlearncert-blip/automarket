export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  transmission: 'Automatique' | 'Manuelle';
  fuelType: 'Essence' | 'Diesel' | 'Électrique' | 'Hybride';
  description: string;
  features: string[];
  images: string[]; // This will now hold image URLs from Supabase
};
