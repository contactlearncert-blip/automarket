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
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse e-mail invalide."),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères."),
  vehicle: z.string(),
});

type ContactSellerFormProps = {
    vehicleName: string;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 448 512" {...props}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 .4c101.2 0 183.8 82.6 183.8 183.8 0 33.4-9.1 65.4-25.4 92.8L388 439.5l-94.1-24.9c-26.2 15.6-56.2 24.8-87.8 24.8h-.1c-101.3 0-183.8-82.6-183.8-183.8 0-101.2 82.6-183.8 183.8-183.8zm119.3 140.3c-3.1-5.1-11.3-8.2-15.5-8.7-4.4-.5-10.2-.5-15.5.5-5.3 1-13.4 4.4-18.3 9.3-5.3 5.3-10.2 11.8-13.4 16.6-3.1 4.4-6.2 5.3-11.3 1-5.1-4.4-21.3-7.7-40.2-24.9-15.5-13.4-28.8-29.6-33.1-36.1-4.4-6.2-.[.1-10.2 4.4-13.4 3.1-3.1 7.7-8.2 10.2-11.8 2.5-3.1 3.1-5.3 1.5-8.7-1.5-3.1-10.2-24.9-14.4-33.1-4.4-8.2-8.7-7.2-12.4-7.2-3.1 0-8.2-.5-13.4-.5-5.3 0-13.4 1.5-20.4 8.7-6.2 6.2-23.8 23.2-23.8 56.2 0 33.1 24.9 65.4 28.8 70.8 3.1 5.3 48.2 75.8 118.3 104.3 16.6 6.2 30 9.9 40.2 12.4 10.2 2.5 19.5 2 26.2-1.5 7.7-3.1 23.8-9.9 27-19.5 3.1-10.2 3.1-18.3 2-19.5-1.5-1.5-5.3-2.5-11.3-5.3z"></path></svg>
);


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

  const whatsappMessage = `Je suis intéressé par le ${vehicleName}. Pouvez-vous me donner plus de détails ?`;
  const whatsappUrl = `https://wa.me/212716639486?text=${encodeURIComponent(whatsappMessage)}`;

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
                    <div className="space-y-2">
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                "Envoi en cours..."
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" /> Envoyer le Message
                                </>
                            )}
                        </Button>
                        <Button asChild className="w-full bg-[#25D366] hover:bg-[#1DAE58] text-white" variant="secondary">
                            <Link href={whatsappUrl} target="_blank">
                                <WhatsAppIcon className="w-4 h-4 mr-2" /> Contacter sur WhatsApp
                            </Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
