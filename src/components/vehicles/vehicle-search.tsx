"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from 'lucide-react';
import type { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

type Filters = { make: string; price: number[] };

type VehicleSearchProps = {
  makes: string[];
  onSearchChange: (term: string) => void;
  onFilterChange: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
};

export function VehicleSearch({ makes, onSearchChange, onFilterChange, filters }: VehicleSearchProps) {

  return (
    <Card>
      <CardContent className="p-6 pt-6 space-y-6">
        <div className="space-y-2">
            <Label htmlFor="search">Rechercher</Label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    id="search"
                    aria-label="Rechercher par marque, modèle ou année"
                    placeholder="Modèle, options..."
                    className="pl-9"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="make-select">Marque</Label>
            <Select value={filters.make} onValueChange={(value) => onFilterChange(prev => ({...prev, make: value}))}>
                <SelectTrigger id="make-select">
                    <SelectValue placeholder="Toutes les marques" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {makes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <Label>Prix Max</Label>
                <span className="text-sm font-semibold text-primary">{filters.price[1].toLocaleString('fr-FR')} €</span>
            </div>
            <Slider
                value={[filters.price[1]]}
                max={200000}
                step={1000}
                onValueChange={(value) => onFilterChange(prev => ({...prev, price: [0, value[0]]}))}
            />
        </div>
      </CardContent>
    </Card>
  );
}
