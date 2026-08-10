'use client';

import { useServices, useTechnicians } from '@/hooks/usePublicData';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { TechnicianCard } from '@/components/shared/TechnicianCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: technicians, isLoading: techLoading } = useTechnicians();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* Hero */}
      <section className="mb-12 rounded-xl bg-gray-900 px-8 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Trusted Home Services, On Demand</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          Book verified plumbers, electricians, cleaners, and more — all in one place.
        </p>
        <Link href="/services">
          <Button size="lg" className="mt-6">
            Browse Services
          </Button>
        </Link>
      </section>

      {/* Featured Services */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Featured Services</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicesLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-lg" />
              ))
            : services?.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
        </div>
      </section>

      {/* Top Technicians */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Top Technicians</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))
            : technicians?.slice(0, 3).map((tech) => (
                <TechnicianCard key={tech.id} technician={tech} />
              ))}
        </div>
      </section>
    </main>
  );
}