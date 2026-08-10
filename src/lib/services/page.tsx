'use client';

import { useState } from 'react';
import { useServices, useCategories } from '@/hooks/usePublicData';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ServicesPage() {
  const [categoryId, setCategoryId] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const { data: categories } = useCategories();
  const { data: services, isLoading } = useServices({
    categoryId: categoryId || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Browse Services</h1>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-4">
        <Select value={categoryId} onValueChange={(value) => setCategoryId(value ?? '')}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))
          : services?.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>

      {!isLoading && services?.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No services found matching your filters.</p>
      )}
    </main>
  );
}