"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from 'lucide-react';
import { handleContactSeller } from '@/lib/actions';

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse e-mail invalide."),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères."),
  vehicle: z.string(),
});

type ContactSellerFormProps = {
    vehicleName: string;
}

export function ContactSellerForm({ vehicleName }: ContactSellerFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: `Je suis intéressé par le ${vehicleName}. Pouvez-vous me donner plus de détails ?`,
      vehicle: vehicleName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleContactSeller(values);
    if (result.success) {
      toast({
        title: "Message Envoyé !",
        description: "Le vendeur vous répondra sous peu.",
        className: 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600'
      });
      form.reset({
          name: "",
          email: "",
          message: `Je suis intéressé par le ${vehicleName}. Pouvez-vous me donner plus de détails ?`,
          vehicle: vehicleName,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oups ! Quelque chose s'est mal passé.",
        description: "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer.",
      });
    }
  }

  return (
    <Card className="shadow-lg sticky top-8">
        <CardHeader>
            <CardTitle>Contacter le Vendeur</CardTitle>
            <CardDescription>Envoyez un message pour vous renseigner sur cette voiture.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="vehicle" render={({ field }) => (
                        <FormItem><FormControl><Input type="hidden" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Votre Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jean Dupont" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Votre Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="vous@exemple.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea rows={4} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                            "Envoi en cours..."
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" /> Envoyer le Message
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
