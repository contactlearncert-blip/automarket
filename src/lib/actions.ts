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
        return { success: false, error: 'Invalid fields.' };
    }

    // In a real app, you would send an email, save to a DB, etc.
    console.log("New seller contact message:", validatedFields.data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
}
