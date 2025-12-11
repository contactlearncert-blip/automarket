import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type FeaturedVehicleCardProps = {
  vehicle: Vehicle;
};

export function FeaturedVehicleCard({ vehicle }: FeaturedVehicleCardProps) {
  const imageUrl = vehicle.images?.[0] || 'https://placehold.co/600x400/EEE/31343C?text=Photo+Indisponible';
  
  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block group">
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-0">
                <div className="relative aspect-[4/3] w-full">
                <Image
                    src={imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                 <Badge variant="secondary" className="absolute top-3 right-3 text-sm">{vehicle.year}</Badge>
                </div>
            </CardContent>
        </Card>
    </Link>
  );
}
