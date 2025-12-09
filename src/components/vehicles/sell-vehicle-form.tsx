"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Send, Trash2, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { supabase } from '@/lib/supabaseClient';

const formSchema = z.object({
  make: z.string().min(2, "La marque est requise."),
  model: z.string().min(1, "Le modèle est requis."),
  year: z.coerce.number().min(1900, "Année invalide.").max(new Date().getFullYear() + 1, "Année invalide."),
  price: z.coerce.number().min(1, "Le prix doit être positif."),
  mileage: z.coerce.number().min(0, "Le kilométrage ne peut pas être négatif."),
  engine: z.string().min(2, "La motorisation est requise."),
  transmission: z.enum(['Automatique', 'Manuelle']),
  fuelType: z.enum(['Essence', 'Diesel', 'Électrique', 'Hybride']),
  description: z.string().min(10, "La description doit comporter au moins 10 caractères."),
  features: z.array(z.object({ value: z.string().min(1, "La caractéristique ne peut pas être vide.") })).optional(),
  images: z.custom<FileList>().refine(files => files && files.length >= 3, "Vous devez télécharger au moins 3 photos."),
});

export function SellVehicleForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      engine: "",
      transmission: 'Automatique',
      fuelType: 'Essence',
      description: "",
      features: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features"
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const imageUrls: string[] = [];
      const imageFiles = Array.from(values.images);

      for (const file of imageFiles) {
        const filePath = `public/${Date.now()}-${file.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(data.path);
        
        imageUrls.push(publicUrl);
      }

      const vehicleData = {
        make: values.make,
        model: values.model,
        year: values.year,
        price: values.price,
        mileage: values.mileage,
        engine: values.engine,
        transmission: values.transmission,
        fuel_type: values.fuelType,
        description: values.description,
        features: values.features?.map(f => f.value).filter(Boolean),
        image_urls: imageUrls,
      };

      const { error: insertError } = await supabase.from('vehicles').insert([vehicleData]);

      if (insertError) {
        throw insertError;
      }

      toast({
          title: "Annonce Soumise !",
          description: "Votre véhicule a été mis en vente avec succès.",
          className: 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600'
      });
      form.reset();

    } catch (error: any) {
        console.error("Error submitting vehicle:", error);
        toast({
            variant: "destructive",
            title: "Une erreur est survenue",
            description: error.message || "Impossible de soumettre l'annonce.",
        });
    }
  }

  return (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Détails du véhicule</CardTitle>
            <CardDescription>Fournissez les informations les plus précises possible.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="make" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Marque</FormLabel>
                                <FormControl><Input placeholder="ex: Toyota" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="model" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Modèle</FormLabel>
                                <FormControl><Input placeholder="ex: Camry" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                     <div className="grid md:grid-cols-3 gap-6">
                        <FormField control={form.control} name="year" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Année</FormLabel>
                                <FormControl><Input type="number" placeholder="ex: 2022" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prix (€)</FormLabel>
                                <FormControl><Input type="number" placeholder="ex: 25000" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="mileage" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kilométrage (km)</FormLabel>
                                <FormControl><Input type="number" placeholder="ex: 15000" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <FormField control={form.control} name="engine" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Motorisation</FormLabel>
                            <FormControl><Input placeholder="ex: 2.5L 4-Cylindres" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="transmission" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transmission</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Choisir une transmission" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Automatique">Automatique</SelectItem>
                                        <SelectItem value="Manuelle">Manuelle</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="fuelType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Carburant</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Choisir un type de carburant" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Essence">Essence</SelectItem>
                                        <SelectItem value="Diesel">Diesel</SelectItem>
                                        <SelectItem value="Électrique">Électrique</SelectItem>
                                        <SelectItem value="Hybride">Hybride</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl><Textarea rows={5} placeholder="Décrivez votre véhicule..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    <div>
                        <FormLabel>Caractéristiques</FormLabel>
                        <FormDescription className="mb-2">Ajoutez des caractéristiques ou des options (ex: Bluetooth, Sièges en cuir...)</FormDescription>
                        {fields.map((field, index) => (
                            <FormField
                            key={field.id}
                            control={form.control}
                            name={`features.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2 mb-2">
                                <FormControl>
                                    <Input {...field} placeholder={`Caractéristique #${index + 1}`} />
                                </FormControl>
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </FormItem>
                            )}
                            />
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ value: "" })}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Ajouter une caractéristique
                        </Button>
                    </div>

                     <div>
                        <FormLabel>Photos</FormLabel>
                         <FormDescription className="mb-2">Téléchargez au moins trois photos de votre véhicule.</FormDescription>
                        <FormField control={form.control} name="images" render={({ field: { onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez</p>
                                                <p className="text-xs text-muted-foreground">PNG, JPG (MIN. 3)</p>
                                            </div>
                                            <Input 
                                              id="dropzone-file" 
                                              type="file" 
                                              className="hidden" 
                                              multiple
                                              {...fieldProps}
                                              onChange={(event) => {
                                                  onChange(event.target.files);
                                              }} 
                                            />
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                            "Soumission en cours..."
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" /> Mettre en vente
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
