"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recommendVehicles } from '@/ai/flows/ai-recommended-vehicles';
import { Sparkles } from 'lucide-react';

export function AIRecommendations() {
    const [recommendations, setRecommendations] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGetRecommendations = async () => {
        setIsLoading(true);
        setError('');
        setRecommendations('');

        // Mock user data for the AI
        const mockSearchHistory = 'used Toyota, SUV under $40000, 2020 or newer';
        const mockPreferences = 'prefers fuel-efficient cars, needs space for a family, likes modern tech features like Apple CarPlay';

        try {
            const result = await recommendVehicles({
                searchHistory: mockSearchHistory,
                preferences: mockPreferences,
            });
            setRecommendations(result.recommendations);
        } catch (e) {
            console.error(e);
            setError('Could not get recommendations at this time. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-primary/20">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="p-3 bg-primary rounded-lg">
                        <Sparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="font-headline text-2xl">Personalized Recommendations</CardTitle>
                        <CardDescription>Let our AI find the perfect car for you based on your interests.</CardDescription>
                    </div>
                     {!recommendations && !isLoading && (
                        <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading ? 'Generating...' : 'Get AI Suggestions'}
                        </Button>
                    )}
                </div>
            </CardHeader>
            {(isLoading || error || recommendations) && (
                <CardContent>
                    {isLoading && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                            <span>Analyzing your preferences...</span>
                        </div>
                    )}
                    {error && <p className="text-destructive">{error}</p>}
                    {recommendations && (
                        <div className="space-y-2 text-sm rounded-md border bg-background/50 p-4">
                            <h4 className="font-semibold text-foreground">Based on your activity, we suggest:</h4>
                            <p className="text-muted-foreground">{recommendations}</p>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
