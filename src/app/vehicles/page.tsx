import { vehicles, vehicleMakes } from '@/lib/data';
import { VehicleList } from '@/components/vehicles/vehicle-list';
import { Separator } from '@/components/ui/separator';

export default function VehiclesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Notre Catalogue</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Trouvez le véhicule parfait parmi notre collection exclusive.
          </p>
        </div>
        <Separator className="my-8" />
      <div className="space-y-12">
        <VehicleList allVehicles={vehicles} makes={vehicleMakes} />
      </div>
    </div>
  );
}
