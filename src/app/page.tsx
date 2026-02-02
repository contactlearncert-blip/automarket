

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FeaturedVehicleCard } from '@/components/vehicles/featured-vehicle-card';
import type { Vehicle } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';


async function getFeaturedVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Erreur de connexion à la base de données pour les véhicules en vedette. Assurez-vous que vos clés Supabase sont correctement configurées dans le fichier .env et que la table "vehicles" existe.');
  }
  
  const featuredVehicles: Vehicle[] = data || [];
  return { vehicles: featuredVehicles };
}


export default async function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-showroom');
  const { vehicles: featuredVehicles } = await getFeaturedVehicles();

  return (
    <>
      <div className="relative h-[calc(80vh-80px)] min-h-[500px] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
            Conduisez <br />
            <span className="text-blue-400">l&apos;Exceptionnel</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Découvrez une collection exclusive des plus beaux véhicules au monde. Performance, luxe et style réunis sur une seule marketplace.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/vehicles">
                Parcourir le Stock <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-headline font-bold">Véhicules en Vedette</h2>
              <p className="text-muted-foreground mt-1">Sélection exclusive rien que pour vous.</p>
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link href="/vehicles">
                Tout Voir <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {featuredVehicles && featuredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredVehicles.map(vehicle => (
                  <FeaturedVehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
          ) : (
             <p className="text-center text-muted-foreground">Aucun véhicule en vedette pour le moment.</p>
          )}
        </div>
      </section>
    </>
  );
}
