import { SellVehicleForm } from '@/components/vehicles/sell-vehicle-form';

export default function SellPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Vendez votre véhicule</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Remplissez le formulaire ci-dessous pour mettre votre voiture en vente.
            </p>
        </div>
        <SellVehicleForm />
      </div>
    </div>
  );
}
