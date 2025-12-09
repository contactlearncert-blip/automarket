import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Cog, Fuel, Gauge } from 'lucide-react';

type VehicleCardProps = {
  vehicle: Vehicle;
};

function getPlaceholderImage(id: string) {
    return PlaceHolderImages.find(p => p.id === id) || PlaceHolderImages[0];
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const image = getPlaceholderImage(vehicle.images[0]);
  
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/vehicles/${vehicle.id}`} className="block">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-2">
        <Badge variant="secondary">{vehicle.year}</Badge>
        <CardTitle className="font-headline text-xl">
            <Link href={`/vehicles/${vehicle.id}`} className="hover:text-primary transition-colors hover:underline">
                {vehicle.make} {vehicle.model}
            </Link>
        </CardTitle>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5" title="Mileage">
                <Gauge className="h-4 w-4" />
                <span>{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex items-center gap-1.5" title="Fuel Type">
                <Fuel className="h-4 w-4" />
                <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Transmission">
                <Cog className="h-4 w-4" />
                <span>{vehicle.transmission}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
         <p className="text-2xl font-bold text-primary">${vehicle.price.toLocaleString()}</p>
        <Button asChild variant="outline">
          <Link href={`/vehicles/${vehicle.id}`}>
            Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
