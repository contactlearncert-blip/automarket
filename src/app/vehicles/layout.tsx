import { AlertTriangle } from 'lucide-react';
import React from 'react';

type Props = {
    children: React.ReactNode;
}

export default function VehiclesLayout({ children }: Props) {
    return (
        <React.Suspense fallback={<Loading />}>
            {children}
        </React.Suspense>
    );
}


function Loading() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="h-10 w-1/2 bg-muted rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 items-start">
                <div className="space-y-6 p-6 bg-card rounded-lg border">
                    <div className="space-y-2">
                        <div className="h-4 w-1/4 bg-muted rounded animate-pulse" />
                        <div className="h-10 w-full bg-muted rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-1/4 bg-muted rounded animate-pulse" />
                        <div className="h-10 w-full bg-muted rounded animate-pulse" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-card border rounded-lg overflow-hidden">
                           <div className="aspect-[4/3] w-full bg-muted animate-pulse" />
                           <div className="p-4 space-y-3">
                                <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                           </div>
                           <div className="p-4 pt-0 flex justify-between items-center">
                                <div className="h-7 w-1/3 bg-muted rounded animate-pulse" />
                                <div className="h-9 w-1/4 bg-muted rounded animate-pulse" />
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
