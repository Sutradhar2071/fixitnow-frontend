import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/types';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/technicians/${service.technicianId}`}>
      <Card className="h-full transition hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{service.title}</CardTitle>
            <Badge variant="secondary">{service.category?.name}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-gray-500">
            {service.description || 'No description provided.'}
          </p>
          {service.technician?.user && (
            <p className="mt-2 text-sm text-gray-600">
              by {service.technician.user.name}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-lg font-bold">৳{service.price}</span>
          {service.technician && (
            <span className="text-sm text-gray-500">
              ⭐ {service.technician.avgRating?.toFixed(1) || 'New'}
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}