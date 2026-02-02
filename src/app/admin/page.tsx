'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ADMIN_PASSWORD = 'ZangaAuto';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('zanga-admin-auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('zanga-admin-auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect.');
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('zanga-admin-auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Zone d'Administration</CardTitle>
                <CardDescription>
                  Bienvenue dans votre espace de gestion.
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Comment ajouter un véhicule ?</p>
            <p className="mt-2 text-muted-foreground">
              Pour le moment, l'ajout de véhicules se fait manuellement en modifiant le fichier suivant dans votre projet :
            </p>
            <code className="mt-4 block rounded bg-muted p-3 text-sm font-mono text-left break-all">
              src/lib/vehicle-data.ts
            </code>
            <p className="mt-4 text-muted-foreground">
              Vous pouvez copier un objet véhicule existant dans le tableau `vehicles` et modifier ses propriétés (marque, modèle, prix, images, etc.) pour ajouter une nouvelle voiture à votre catalogue.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Accès Administrateur</CardTitle>
          <CardDescription>
            Veuillez entrer le mot de passe pour accéder à la page d'administration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleLogin} className="w-full">
            Se connecter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
