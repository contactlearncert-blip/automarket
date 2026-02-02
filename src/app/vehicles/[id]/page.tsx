import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ContactSellerForm } from '@/components/vehicles/contact-seller-form';
import { Cog, Fuel, Gauge, Calendar, DollarSign, Wrench } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { vehicles as allVehicles } from '@/lib/vehicle-data';


async function getVehicle(id: string): Promise<Vehicle | undefined> {
    return allVehicles.find(v => v.id === id);
}


type Spec = {
    icon: React.ElementType;
    label: string;
    value: string | number;
}

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
    const vehicle = await getVehicle(params.id);

    if (!vehicle) {
        notFound();
    }
    
    const specs: Spec[] = [
        { icon: DollarSign, label: "Prix", value: `${vehicle.price.toLocaleString('fr-FR')} FCFA` },
        { icon: Calendar, label: "Année", value: vehicle.year },
        { icon: Gauge, label: "Kilométrage", value: `${vehicle.mileage.toLocaleString('fr-FR')} km` },
        { icon: Fuel, label: "Carburant", value: vehicle.fuelType },
        { icon: Cog, label: "Transmission", value: vehicle.transmission },
        { icon: Wrench, label: "Moteur", value: vehicle.engine },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <Card className="overflow-hidden shadow-lg">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {vehicle.images.length > 0 ? vehicle.images.map((imageUrl, index) => (
                                    <CarouselItem key={index}>
                                        <div className="aspect-[16/10] relative">
                                            <Image
                                                src={imageUrl}
                                                alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                )) : (
                                    <CarouselItem>
                                       <div className="aspect-[16/10] relative bg-secondary flex items-center justify-center">
                                           <span className="text-muted-foreground">Pas d'image disponible</span>
                                       </div>
                                    </CarouselItem>
                                )}
                            </CarouselContent>
                            {vehicle.images.length > 1 && (
                                <>
                                    <CarouselPrevious className="left-4" />
                                    <CarouselNext className="right-4" />
                                </>
                            )}
                        </Carousel>
                    </Card>

                    <div className="mt-8 space-y-6">
                        <h1 className="text-4xl font-headline font-bold">{vehicle.make} {vehicle.model}</h1>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-3">Description</h3>
                            <p className="text-muted-foreground">{vehicle.description}</p>
                        </div>

                        {vehicle.features.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold mb-3">Caractéristiques</h3>
                                <div className="flex flex-wrap gap-2">
                                    {vehicle.features.map(feature => (
                                        <Badge key={feature} variant="outline" className="text-sm">{feature}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Spécifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {specs.map(spec => (
                                        <TableRow key={spec.label}>
                                            <TableCell className="font-medium flex items-center gap-2 p-3">
                                                <spec.icon className="h-4 w-4 text-muted-foreground" />
                                                {spec.label}
                                            </TableCell>
                                            <TableCell className="text-right p-3">{spec.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <ContactSellerForm vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
                </div>
            </div>
        </div>
    );
}
