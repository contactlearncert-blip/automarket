import { VehicleList } from '@/components/vehicles/vehicle-list';
import { supabase } from '@/lib/supabaseClient';
import type { Vehicle } from '@/lib/types';

async function getVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vehicles:', error);
    return { vehicles: [], makes: [] };
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
