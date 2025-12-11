"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-destructive bg-destructive/10 p-12 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <h2 className="mt-6 text-2xl font-semibold text-destructive">
                Impossible de charger les véhicules
            </h2>
            <p className="mt-2 text-center text-sm text-destructive/80 max-w-xl whitespace-pre-wrap">
                {error.message || "Une erreur inconnue est survenue."}
            </p>
            <Button
                onClick={() => reset()}
                className="mt-6"
                variant="destructive"
            >
                Réessayer
            </Button>
        </div>
    </div>
  );
}
