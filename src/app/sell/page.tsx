"use client";

import { useState } from 'react';
import { SellVehicleForm } from '@/components/vehicles/sell-vehicle-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

const ACCESS_CODE = "ibrahim";

export default function SellPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === ACCESS_CODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect. Veuillez réessayer.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-6 w-6" />
              Accès Protégé
            </CardTitle>
            <CardDescription>Veuillez saisir le mot de passe pour accéder à la page de vente.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="access-code" className="sr-only">Mot de passe</label>
                <Input
                  id="access-code"
                  type="password"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  autoFocus
                />
              </div>
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Accéder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Vendez votre véhicule</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Remplissez le formulaire ci-dessous pour mettre votre voiture en vente.
            </p>
        </div>
        <SellVehicleForm />
      </div>
    </div>
  );
}
