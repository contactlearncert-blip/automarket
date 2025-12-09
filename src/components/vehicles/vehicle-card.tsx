import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Cog, Fuel, Gauge } from 'lucide-react';

type VehicleCardProps = {
  vehicle: Vehicle;
};

function getPlaceholderImage(id: string) {
    return PlaceHolderImages.find(p => p.id === id) || PlaceHolderImages[0];
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const image = getPlaceholderImage(vehicle.images[0]);
  
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <CardHeader className="p-0 relative">
        <Link href={`/vehicles/${vehicle.id}`} className="block">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
               <Badge variant="secondary" className="absolute top-3 right-3">{vehicle.year}</Badge>
            </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-3">
        <h3 className="font-bold text-lg leading-tight">
            <Link href={`/vehicles/${vehicle.id}`} className="hover:text-primary transition-colors">
                {vehicle.make} {vehicle.model}
            </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{vehicle.transmission} • {vehicle.fuelType}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5" title="Kilométrage">
                <Gauge className="h-3.5 w-3.5" />
                <span>{vehicle.mileage.toLocaleString('fr-FR')} km</span>
            </div>
            <div className="flex items-center gap-1.5" title="Carburant">
                <Fuel className="h-3.5 w-3.5" />
                <span>{vehicle.fuelType}</span>
            </div>
        </div>

      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
         <p className="text-xl font-bold text-primary">{vehicle.price.toLocaleString('fr-FR')} €</p>
        <Button asChild variant="outline" size="sm">
          <Link href={`/vehicles/${vehicle.id}`}>
            Voir Détails
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
