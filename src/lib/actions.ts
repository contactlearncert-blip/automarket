"use server";

import * as z from 'zod';

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  vehicle: z.string(),
});

export async function handleContactSeller(values: z.infer<typeof contactSchema>) {
    const validatedFields = contactSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: 'Champs invalides.' };
    }

    // Dans une vraie application, vous enverriez un e-mail, enregistreriez dans une base de données, etc.
    console.log("Nouveau message de contact vendeur :", validatedFields.data);
    
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
}
