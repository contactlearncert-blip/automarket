import { Car, Moon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
          <span className="font-headline">AutoMarket</span>
        </Link>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
                <span className="sr-only">Changer de thème</span>
            </Button>
            <Button>Connexion</Button>
        </div>
      </div>
    </header>
  );
}
