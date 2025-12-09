"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from 'lucide-react';
import type { Dispatch, SetStateAction } from "react";

type Filters = { make: string; price: number[] };

type VehicleSearchProps = {
  makes: string[];
  onSearchChange: (term: string) => void;
  onFilterChange: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
};

export function VehicleSearch({ makes, onSearchChange, onFilterChange, filters }: VehicleSearchProps) {

  return (
    <div className="p-6 bg-card rounded-lg border shadow-sm space-y-6">
        <h2 className="text-2xl font-headline font-bold">Find Your Next Car</h2>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                aria-label="Search by make, model, or year"
                placeholder="Search by make, model, or year..."
                className="pl-10 h-12 text-base"
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="lg:col-span-1">
                <label htmlFor="make-select" className="text-sm font-medium mb-2 block">Make</label>
                <Select value={filters.make} onValueChange={(value) => onFilterChange(prev => ({...prev, make: value}))}>
                    <SelectTrigger id="make-select">
                        <SelectValue placeholder="All Makes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        {makes.map(make => (
                            <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="lg:col-span-3">
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-24 text-center">${filters.price[0].toLocaleString()}</span>
                    <Slider
                        value={filters.price}
                        max={200000}
                        step={1000}
                        onValueChange={(value) => onFilterChange(prev => ({...prev, price: value}))}
                    />
                    <span className="text-sm text-muted-foreground w-24 text-center">${filters.price[1].toLocaleString()}{filters.price[1] === 200000 ? '+' : ''}</span>
                </div>
            </div>
        </div>
    </div>
  );
}
