'use client';

import { useParams } from 'next/navigation';
import { useTechnicianById } from '@/hooks/usePublicData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TechnicianProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: technician, isLoading } = useTechnicianById(id);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Skeleton className="h-40 w-full rounded-lg" />
      </main>
    );
  }

  if (!technician) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-center">
        <p>Technician not found.</p>
      </main>
    );
  }

  const initials = technician.user?.name?.charAt(0)?.toUpperCase() || 'T';

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Profile header */}
      <div className="mb-8 flex items-center gap-4 rounded-lg border p-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{technician.user?.name}</h1>
          <p className="text-gray-500">{technician.location}</p>
          <p className="mt-1 text-sm">
            ⭐ {technician.avgRating?.toFixed(1) || 'New'} · {technician.experience} yrs experience
          </p>
        </div>
      </div>

      <p className="mb-6 text-gray-700">{technician.bio}</p>

      <div className="mb-8 flex flex-wrap gap-2">
        {technician.skills?.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>

      {/* Services */}
      <h2 className="mb-4 text-xl font-bold">Services</h2>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {technician.services?.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                {service.title}
                <span className="font-bold">৳{service.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-gray-500">{service.description}</p>
              <Link href={`/dashboard/customer/book?serviceId=${service.id}`}>
                <Button size="sm">Book Now</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reviews */}
      <h2 className="mb-4 text-xl font-bold">Reviews</h2>
      <div className="space-y-4">
        {technician.reviews?.length ? (
          technician.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.customer?.name}</p>
                  <p className="text-sm">⭐ {review.rating}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
    </main>
  );
}