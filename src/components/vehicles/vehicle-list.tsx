"use client";

import { useState, useMemo } from 'react';
import type { Vehicle } from '@/lib/types';
import { VehicleCard } from './vehicle-card';
import { VehicleSearch } from './vehicle-search';

type VehicleListProps = {
  allVehicles: Vehicle[];
  makes: string[];
};

export function VehicleList({ allVehicles, makes }: VehicleListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ make: string; price: number[] }>({
    make: 'all',
    price: [0, 200000],
  });

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter(vehicle => {
      const searchMatch = `${vehicle.make} ${vehicle.model} ${vehicle.year}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const makeMatch = filters.make === 'all' || vehicle.make === filters.make;
      
      const priceMatch = vehicle.price >= filters.price[0] && vehicle.price <= filters.price[1];

      return searchMatch && makeMatch && priceMatch;
    });
  }, [allVehicles, searchTerm, filters]);

  return (
    <section>
      <VehicleSearch
        makes={makes}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilters}
        filters={filters}
      />
      
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold">No Vehicles Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </section>
  );
}
