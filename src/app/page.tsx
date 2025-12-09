import { vehicles, vehicleMakes } from '@/lib/data';
import { VehicleList } from '@/components/vehicles/vehicle-list';
import { AIRecommendations } from '@/components/vehicles/ai-recommendations';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-12">
        <AIRecommendations />
        <Separator />
        <VehicleList allVehicles={vehicles} makes={vehicleMakes} />
      </div>
    </div>
  );
}
