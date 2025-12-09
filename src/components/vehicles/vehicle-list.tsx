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
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <aside className="lg:col-span-1 sticky top-28">
        <VehicleSearch
          makes={makes}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          filters={filters}
        />
      </aside>
      
      <div className="lg:col-span-3">
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold">Aucun véhicule trouvé</h3>
              <p className="text-muted-foreground mt-2">Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.</p>
          </div>
        )}
      </div>
    </section>
  );
}
