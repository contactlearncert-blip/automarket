import { Car } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-2xl text-primary"
        >
          <div className="bg-accent p-2 rounded-lg">
            <Car className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline">AutoHub</span>
        </Link>
      </div>
    </header>
  );
}
