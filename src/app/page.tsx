import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-showroom');

  return (
    <div className="relative h-[calc(100vh-80px)] w-full text-white">
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
          <Button asChild size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">
            <Link href="#">Vendre votre Véhicule</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
