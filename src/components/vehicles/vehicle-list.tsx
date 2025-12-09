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
  const [filters, setFilters] = useState<{ make: string; }>({
    make: 'all',
  });

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter(vehicle => {
      const searchMatch = `${vehicle.make} ${vehicle.model} ${vehicle.year}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const makeMatch = filters.make === 'all' || vehicle.make === filters.make;
      
      return searchMatch && makeMatch;
    });
  }, [allVehicles, searchTerm, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 items-start">
      <aside className="sticky top-28">
        <VehicleSearch
          makes={makes}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          filters={filters}
        />
      </aside>
      
      <div>
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
              <h3 className="text-2xl font-semibold">Aucun véhicule trouvé</h3>
              <p className="text-muted-foreground mt-2 max-w-md">Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.</p>
          </div>
        )}
      </div>
    </div>
  );
}
