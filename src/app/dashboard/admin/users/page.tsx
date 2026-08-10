'use client';

import { useState } from 'react';
import { useAdminUsers, useUpdateUserStatus } from '@/hooks/useAdminData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>('');
  const { data: users, isLoading } = useAdminUsers(roleFilter || undefined);
  const { mutate: updateStatus, isPending } = useUpdateUserStatus();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v ?? '')}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="TECHNICIAN">Technician</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(user.createdAt), 'PP')}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.role !== 'ADMIN' && (
                      <Button
                        size="sm"
                        variant={user.status === 'ACTIVE' ? 'destructive' : 'outline'}
                        disabled={isPending}
                        onClick={() =>
                          updateStatus({
                            id: user.id,
                            status: user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE',
                          })
                        }
                      >
                        {user.status === 'ACTIVE' ? 'Ban' : 'Unban'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}