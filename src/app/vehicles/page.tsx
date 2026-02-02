import { VehicleList } from '@/components/vehicles/vehicle-list';
import type { Vehicle } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';

async function getVehicles() {
  const { data: allVehicles, error: vehiclesError } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (vehiclesError) {
    console.error('Supabase vehicles error:', vehiclesError);
    throw new Error('Erreur de connexion à la base de données pour le catalogue. Assurez-vous que vos clés Supabase sont correctement configurées et que la table "vehicles" existe.');
  }

  const { data: makesData, error: makesError } = await supabase
    .from('vehicles')
    .select('make');

  if (makesError) {
    console.error('Supabase makes error:', makesError);
    // This is less critical, we can maybe continue without makes
    // For now, let's throw.
    throw new Error('Erreur de connexion à la base de données pour les marques.');
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
