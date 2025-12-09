import { vehicles, vehicleMakes } from '@/lib/data';
import { VehicleList } from '@/components/vehicles/vehicle-list';

export default function VehiclesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-12">
        <VehicleList allVehicles={vehicles} makes={vehicleMakes} />
      </div>
    </div>
  );
}
