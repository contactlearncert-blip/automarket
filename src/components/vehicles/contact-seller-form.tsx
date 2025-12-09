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
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
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
      message: `I'm interested in the ${vehicleName}. Can you provide more details?`,
      vehicle: vehicleName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleContactSeller(values);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "The seller will get back to you shortly.",
        className: 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600'
      });
      form.reset({
          name: "",
          email: "",
          message: `I'm interested in the ${vehicleName}. Can you provide more details?`,
          vehicle: vehicleName,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
      });
    }
  }

  return (
    <Card className="shadow-lg sticky top-8">
        <CardHeader>
            <CardTitle>Contact Seller</CardTitle>
            <CardDescription>Send a message to inquire about this car.</CardDescription>
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
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" type="email" {...field} />
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
                            "Sending..."
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" /> Send Message
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
