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
import { PlusCircle, Trash2, Loader2, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

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

function AddVehicleForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function onSubmit(data: VehicleFormValues) {
    setIsSubmitting(true);
    const vehicleData = {
      ...data,
      features: data.features ? data.features.split(',').map(s => s.trim()).filter(Boolean) : [],
      images: data.images.map(img => img.url).filter(Boolean),
    };

    const { error } = await supabase.from('vehicles').insert([vehicleData]);
    
    setIsSubmitting(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur lors de l\'ajout',
        description: `Une erreur est survenue: ${error.message}`,
      });
    } else {
      toast({
        title: 'Véhicule ajouté !',
        description: `${data.make} ${data.model} a été ajouté avec succès.`,
      });
      form.reset();
      form.setValue('images', [{ url: '' }]);
    }
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">
        Remplissez ce formulaire pour ajouter un nouveau véhicule directement au catalogue.
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

          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Server className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter le véhicule'}
          </Button>
        </form>
      </Form>
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
            <CardTitle>Ajouter un nouveau véhicule</CardTitle>
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
