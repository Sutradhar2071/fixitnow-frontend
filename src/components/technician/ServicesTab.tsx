"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serviceSchema,
  ServiceFormValues,
} from "@/lib/validations/technician.schema";
import {
  useMyServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/useTechnicianData";
import { useCategories } from "@/hooks/usePublicData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ServicesTab() {
  const { data: services, isLoading } = useMyServices();
  const { data: categories } = useCategories();
  const { mutate: createService, isPending: isCreating } = useCreateService();
  const { mutate: deleteService } = useDeleteService();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema) as Resolver<ServiceFormValues>,
  });

  const selectedCategory = watch("categoryId");

  const onSubmit = (data: ServiceFormValues) => {
    createService(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Services</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button>+ Add Service</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Pipe Repair"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (৳)</Label>
                <Input id="price" type="number" {...register("price")} />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(v) => setValue("categoryId", v ?? "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-red-500">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Service"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : services?.length === 0 ? (
          <p className="text-gray-500">
            You haven&apos;t added any services yet.
          </p>
        ) : (
          <div className="space-y-3">
            {services?.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{service.title}</p>
                  <p className="text-sm text-gray-500">
                    {service.category?.name} · ৳{service.price}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
