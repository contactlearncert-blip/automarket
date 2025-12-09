'use server';

/**
 * @fileOverview Vehicle recommendation AI agent based on search history and preferences.
 *
 * - recommendVehicles - A function that recommends vehicles based on user preferences.
 * - AIRecommendedVehiclesInput - The input type for the recommendVehicles function.
 * - AIRecommendedVehiclesOutput - The return type for the recommendVehicles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecommendedVehiclesInputSchema = z.object({
  searchHistory: z
    .string()
    .describe(
      'A string containing the user search history, including makes, models, years, price ranges, and other relevant criteria.'
    ),
  preferences: z
    .string()
    .describe(
      'A string containing the user preferences, such as preferred vehicle types, features, and brands.'
    ),
});
export type AIRecommendedVehiclesInput = z.infer<typeof AIRecommendedVehiclesInputSchema>;

const AIRecommendedVehiclesOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A string containing a list of recommended vehicles based on the search history and preferences.'
    ),
});
export type AIRecommendedVehiclesOutput = z.infer<typeof AIRecommendedVehiclesOutputSchema>;

export async function recommendVehicles(
  input: AIRecommendedVehiclesInput
): Promise<AIRecommendedVehiclesOutput> {
  return recommendVehiclesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendVehiclesPrompt',
  input: {schema: AIRecommendedVehiclesInputSchema},
  output: {schema: AIRecommendedVehiclesOutputSchema},
  prompt: `You are an AI assistant specializing in vehicle recommendations.

  Based on the user's search history and preferences, provide a list of recommended vehicles.
  The recommendations should be tailored to the user's specific needs and interests.

  Search History: {{{searchHistory}}}
  Preferences: {{{preferences}}}

  Recommendations:`,
});

const recommendVehiclesFlow = ai.defineFlow(
  {
    name: 'recommendVehiclesFlow',
    inputSchema: AIRecommendedVehiclesInputSchema,
    outputSchema: AIRecommendedVehiclesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
