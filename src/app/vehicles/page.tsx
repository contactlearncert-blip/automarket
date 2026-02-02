import { VehicleList } from '@/components/vehicles/vehicle-list';
import type { Vehicle } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';

async function getVehicles() {
  if (!supabase) {
    return { vehicles: [], makes: [] };
  }

  const { data: allVehicles, error: vehiclesError } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (vehiclesError) {
    return { vehicles: [], makes: [] };
  }

  const { data: makesData, error: makesError } = await supabase
    .from('vehicles')
    .select('make');

  if (makesError) {
    return { vehicles: allVehicles || [], makes: [] };
  }

  const makes = [...new Set((makesData || []).map(v => v.make))];
  return { vehicles: allVehicles || [], makes };
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
