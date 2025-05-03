import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  capacity: z.string().min(2, 'Capacity must be at least 2 characters'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string().min(1)).min(1, 'At least one feature is required'),
  applications: z.array(z.string().min(1)).min(1, 'At least one application is required'),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
});

export type ProductFormValues = z.infer<typeof productSchema>;