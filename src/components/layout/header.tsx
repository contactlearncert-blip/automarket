import { Car, Moon, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { MobileNav } from './mobile-nav';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-2xl text-primary"
        >
          <div className="bg-primary p-2 rounded-lg">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline">ZangaAuto</span>
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/vehicles">Catalogue</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">À Propos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin">Ajouter voitures</Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
            <span className="sr-only">Changer de thème</span>
          </Button>
        </div>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Menu</SheetTitle>
                      <SheetDescription>
                        Navigation principale du site mobile.
                      </SheetDescription>
                    </SheetHeader>
                    <MobileNav />
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
