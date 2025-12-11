import { VehicleList } from '@/components/vehicles/vehicle-list';
import { supabase } from '@/lib/supabaseClient';
import type { Vehicle } from '@/lib/types';

export const revalidate = 60; // Revalidate every 60 seconds

async function getVehicles() {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
    
    const vehicles: Vehicle[] = data.map(v => ({
      id: v.id.toString(),
      make: v.make || '',
      model: v.model || '',
      year: v.year || 0,
      price: v.price || 0,
      mileage: v.mileage || 0,
      engine: v.engine || '',
      transmission: v.transmission as Vehicle['transmission'] || 'Automatique',
      fuelType: v.fuel_type as Vehicle['fuelType'] || 'Essence',
      description: v.description || '',
      features: v.features || [],
      images: v.image_urls || [],
    }));

    const makes = [...new Set(vehicles.map(v => v.make))];

    return { vehicles, makes };
  } catch (e: any) {
    if (e instanceof TypeError && e.message.includes('fetch failed')) {
      throw new Error(`Erreur Supabase: ${e.message}. Vérifiez vos variables d'environnement Supabase dans Vercel ou votre fichier .env.local.`);
    }
    // Re-throw other errors to be caught by Next.js error handling
    throw e;
  }
}


export default async function VehiclesPage() {
  // Let Next.js handle errors with the error boundary
  const { vehicles, makes } = await getVehicles();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Notre Catalogue</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Trouvez le véhicule parfait parmi notre collection exclusive.
          </p>
        </div>
      <VehicleList allVehicles={vehicles} makes={makes} />
    </div>
  );
}
