import { VehicleList } from '@/components/vehicles/vehicle-list';
import type { Vehicle } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '@/lib/database.types';


// Revalidate the data every 60 seconds
export const revalidate = 60;

function mapVehicleData(dbVehicle: Tables<'vehicles'>): Vehicle {
  return {
    id: String(dbVehicle.id),
    make: dbVehicle.make ?? 'N/A',
    model: dbVehicle.model ?? 'N/A',
    year: dbVehicle.year ?? 0,
    price: dbVehicle.price ?? 0,
    mileage: dbVehicle.mileage ?? 0,
    engine: dbVehicle.engine ?? 'N/A',
    transmission: (dbVehicle.transmission as Vehicle['transmission']) ?? 'Manuelle',
    fuelType: (dbVehicle.fuel_type as Vehicle['fuelType']) ?? 'Essence',
    description: dbVehicle.description ?? '',
    features: dbVehicle.features ?? [],
    images: dbVehicle.image_urls ?? [],
  };
}

async function getVehicles() {
  if (!supabase) {
    throw new Error("La configuration de Supabase est manquante. Impossible de charger le catalogue.");
  }
  const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Erreur de connexion à la base de données. Veuillez vérifier votre configuration. Détails: ${error.message}`);
  }
  
  const allVehicles: Vehicle[] = (data ?? []).map(mapVehicleData);

  const makes = [...new Set(allVehicles.map(v => v.make))];
  return { vehicles: allVehicles, makes };
}


export default async function VehiclesPage() {
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
