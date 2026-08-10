import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechnicianProfile } from "@/types";

export function TechnicianCard({
  technician,
}: {
  technician: TechnicianProfile;
}) {
  return (
    <Link href={`/technicians/${technician.id}`}>
      <Card className="h-full transition hover:shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${technician.user?.name || "T"}`}
              alt={technician.user?.name || "Technician"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-semibold">{technician.user?.name}</p>
            <p className="text-sm text-gray-500">
              {technician.location || "Location not set"}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <p className="line-clamp-2 text-sm text-gray-500">{technician.bio}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {technician.skills?.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="mt-2 text-sm">
            ⭐ {technician.avgRating?.toFixed(1) || "New"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
