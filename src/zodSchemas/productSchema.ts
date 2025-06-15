import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  sizes: z
    .array(z.string())
    .min(1, { message: "At least one size is required" })
    .refine((sizes) => sizes.length > 0, { message: "At least one size is required" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be positive" })
    .min(0.01, { message: "Price must be at least 0.01" }),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  style: z.string().min(1, { message: "Style is required" }),
  category: z.string().min(1, { message: "Category is required" }),
})