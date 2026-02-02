'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { PlusCircle, Trash2, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Code } from 'lucide-react';

const ADMIN_PASSWORD = 'ZangaAuto';

const vehicleFormSchema = z.object({
  make: z.string().min(2, 'La marque doit comporter au moins 2 caractères.'),
  model: z.string().min(1, 'Le modèle est requis.'),
  year: z.coerce
    .number()
    .min(1900, 'Année invalide.')
    .max(new Date().getFullYear() + 1, "L'année ne peut pas être dans le futur."),
  price: z.coerce.number().min(0, 'Le prix doit être un nombre positif.'),
  mileage: z.coerce.number().min(0, 'Le kilométrage doit être un nombre positif.'),
  engine: z.string().min(1, 'La motorisation est requise.'),
  transmission: z.enum(['Automatique', 'Manuelle']),
  fuelType: z.enum(['Essence', 'Diesel', 'Électrique', 'Hybride']),
  description: z.string().min(10, 'La description doit comporter au moins 10 caractères.'),
  features: z.string().optional(),
  images: z.array(z.object({ url: z.string().url('Veuillez entrer une URL valide.') })).min(1, 'Au moins une image est requise.'),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

function GenerateVehicleCodeForm() {
  const [generatedCode, setGeneratedCode] = useState('');
  const { toast } = useToast();

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      transmission: 'Automatique',
      fuelType: 'Essence',
      features: '',
      images: [{ url: '' }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  function onSubmit(data: VehicleFormValues) {
    const newId = Date.now().toString();
    const vehicleObject = {
      id: newId,
      ...data,
      features: data.features ? data.features.split(',').map(s => s.trim()).filter(Boolean) : [],
      images: data.images.map(img => img.url).filter(Boolean),
    };
    
    // Pretty print the object
    const codeString = `{\n${Object.entries(vehicleObject).map(([key, value]) => {
      let formattedValue;
      if (key === 'id') {
         formattedValue = `'${value}'`;
      } else if (typeof value === 'string') {
        formattedValue = `'${value.replace(/'/g, "\\'")}'`;
      } else if (Array.isArray(value)) {
        formattedValue = `[${value.map(v => `'${v.replace(/'/g, "\\'")}'`).join(', ')}]`;
      } else {
        formattedValue = value;
      }
      return `  ${key}: ${formattedValue}`;
    }).join(',\n')}\n},`;
    
    setGeneratedCode(codeString);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: 'Copié !',
      description: 'Le code a été copié dans le presse-papiers.',
    });
  };

  return (
    <>
      <p className="text-muted-foreground mb-6">
        Remplissez ce formulaire pour générer le code du véhicule. Copiez ensuite ce code et collez-le dans le fichier <code>src/lib/vehicle-data.ts</code>.
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
           <div className="space-y-4">
            <Label>URLs des Images</Label>
            <FormDescription>
              Ajoutez les URLs complètes des images. La première sera l'image principale.
            </FormDescription>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`images.${index}.url`}
                render={({ field: inputField }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="https://exemple.com/image.jpg" {...inputField} />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ url: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une URL d'image
            </Button>
             <FormMessage>
              {form.formState.errors.images && form.formState.errors.images.root?.message}
            </FormMessage>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Code className="mr-2 h-4 w-4" />
            Générer le Code
          </Button>
        </form>
      </Form>
      {generatedCode && (
          <div className="mt-8 space-y-4">
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <Clipboard className="h-4 w-4" />
                Code Généré
              </AlertTitle>
              <AlertDescription>
                Copiez le code ci-dessous et collez-le dans le tableau `vehicles` du fichier <code>src/lib/vehicle-data.ts</code>.
              </AlertDescription>
            </Alert>
            <div className="relative">
              <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-x-auto text-sm">
                {generatedCode}
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={copyToClipboard}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
    </>
  );
}


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Générer un nouveau véhicule</CardTitle>
          </CardHeader>
          <CardContent>
            <GenerateVehicleCodeForm />
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
