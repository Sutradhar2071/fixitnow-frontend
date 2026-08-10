import { z } from 'zod';

export const profileSchema = z.object({
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  experience: z.coerce.number().int().min(0, 'Experience cannot be negative'),
  location: z.string().min(2, 'Location is required'),
  skillsInput: z.string().optional(), // comma-separated input from form
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const serviceSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  price: z.coerce.number().positive('Price must be greater than 0'),
  categoryId: z.string().min(1, 'Please select a category'),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
