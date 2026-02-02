'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, PlusCircle } from 'lucide-react';

const ADMIN_PASSWORD = 'ZangaAuto';

// Zod schema for form validation
const vehicleFormSchema = z.object({
  make: z.string().min(2, 'La marque doit comporter au moins 2 caractères.'),
  model: z.string().min(1, 'Le modèle est requis.'),
  year: z.coerce
    .number()
    .min(1900, 'Année invalide.')
    .max(
      new Date().getFullYear() + 1,
      "L'année ne peut pas être dans le futur."
    ),
  price: z.coerce.number().min(0, 'Le prix doit être un nombre positif.'),
  mileage: z.coerce.number().min(0, 'Le kilométrage doit être un nombre positif.'),
  engine: z.string().min(1, 'La motorisation est requise.'),
  transmission: z.enum(['Automatique', 'Manuelle']),
  fuelType: z.enum(['Essence', 'Diesel', 'Électrique', 'Hybride']),
  description: z.string().min(10, 'La description doit comporter au moins 10 caractères.'),
  features: z.string().optional(),
  images: z.string().min(1, "Au moins une URL d'image est requise."),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

function AddVehicleForm() {
  const { toast } = useToast();
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      transmission: 'Automatique',
      fuelType: 'Essence',
      features: '',
      images: '',
    },
  });

  function onSubmit(data: VehicleFormValues) {
    const newVehicle = {
      id: String(Date.now()),
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      mileage: Number(data.mileage),
      features: data.features
        ? data.features.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      images: data.images
        .split(',')
        .map((s) => `getImage('${s.trim()}')`)
        .filter(Boolean),
    };
    
    // Custom stringify to handle image mapping without quotes
    const codeString = `{
  id: '${newVehicle.id}',
  make: '${newVehicle.make}',
  model: '${newVehicle.model}',
  year: ${newVehicle.year},
  price: ${newVehicle.price},
  mileage: ${newVehicle.mileage},
  engine: '${newVehicle.engine}',
  transmission: '${newVehicle.transmission}',
  fuelType: '${newVehicle.fuelType}',
  description: '${newVehicle.description.replace(/'/g, "\\'")}',
  features: [${newVehicle.features.map(f => `'${f.replace(/'/g, "\\'")}'`).join(', ')}],
  images: [
    ${newVehicle.images.join(',\n    ')}
  ],
}`;

    setGeneratedCode(codeString);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode + ',');
      toast({
        title: 'Copié !',
        description: 'Le code du véhicule a été copié dans le presse-papiers.',
      });
    }
  };

  if (generatedCode) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-2">Code Généré</h3>
        <p className="text-muted-foreground mb-4">
          Le code de votre véhicule est prêt. Suivez les étapes ci-dessous pour l'ajouter au site.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Copiez le code suivant</h4>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto w-full">
                <code>{generatedCode}</code>
              </pre>
              <Button
                size="icon"
                variant="outline"
                className="absolute top-3 right-3 h-7 w-7"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">2. Ajoutez-le au fichier de données</h4>
            <p className="text-muted-foreground">
              Ouvrez le fichier ci-dessous et collez le code copié à l'intérieur du tableau `vehicles`.
            </p>
            <code className="mt-2 block rounded bg-muted p-3 text-sm font-mono text-left break-all">
              src/lib/vehicle-data.ts
            </code>
            <p className="text-muted-foreground mt-2 text-xs">
              Assurez-vous que l'objet est suivi d'une virgule s'il n'est pas le dernier de la liste.
            </p>
          </div>
        </div>
        
        <Button onClick={() => { setGeneratedCode(null); form.reset(); }} className="mt-8">
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un autre véhicule
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">
        Remplissez le formulaire pour générer le code d'un nouveau véhicule. Vous devrez ensuite le copier/coller dans le fichier de données du projet.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Toyota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modèle</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Camry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix (FCFA)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 15000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilométrage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ex: 25000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="engine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motorisation</FormLabel>
                <FormControl>
                  <Input placeholder="ex: 2.5L 4-Cyl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transmission</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Automatique">Automatique</SelectItem>
                      <SelectItem value="Manuelle">Manuelle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carburant</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Essence">Essence</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybride">Hybride</SelectItem>
                      <SelectItem value="Électrique">Électrique</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description détaillée du véhicule..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caractéristiques</FormLabel>
                <FormControl>
                  <Textarea placeholder="ex: Toit ouvrant, Sièges en cuir, GPS" {...field} />
                </FormControl>
                <FormDescription>Séparez chaque caractéristique par une virgule.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID des images</FormLabel>
                <FormControl>
                  <Textarea placeholder="ex: sedan-1, sedan-1-gallery-1" {...field} />
                </FormControl>
                <FormDescription>
                  Séparez chaque ID d'image (du fichier placeholder-images.json) par une virgule. Le
                  premier sera l'image principale.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full md:w-auto">Générer le Code du Véhicule</Button>
        </form>
      </Form>
    </>
  );
}


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
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Ajouter un Véhicule</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AddVehicleForm />
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