export type Vehicle = {
  id: number;
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
  images: string[];
  created_at: string;
};
