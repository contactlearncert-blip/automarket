"use client";

import Link from "next/link";
import { Car, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b pb-4">
        <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-primary">
          <div className="bg-primary p-2 rounded-lg">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline">AutoMarket</span>
        </Link>
      </div>
      <nav className="flex-grow mt-6">
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/" className="text-lg font-medium hover:text-primary">
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/vehicles" className="text-lg font-medium hover:text-primary">
              Catalogue
            </Link>
          </li>
          <li>
            <Link href="/sell" className="text-lg font-medium hover:text-primary">
              Vendre
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto flex flex-col gap-4 border-t pt-4">
        <Button variant="ghost" className="flex items-center justify-center gap-2">
            <Moon className="h-5 w-5" />
            <span>Changer de thème</span>
        </Button>
      </div>
    </div>
  );
}
