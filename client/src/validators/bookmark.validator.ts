import { z } from 'zod';

export const createBookmarkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Title is required.')
    .max(100, 'Title cannot exceed 100 characters.'),
  url: z
    .string()
    .trim()
    .url('Enter a valid URL.')
    .refine((value) => {
      try {
        const parsed = new URL(value);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, 'Only HTTP and HTTPS URLs are allowed.'),
});

export const updateBookmarkSchema = createBookmarkSchema.partial();

export type CreateBookmarkInput = z.infer<typeof createBookmarkSchema>;
export type UpdateBookmarkInput = z.infer<typeof updateBookmarkSchema>;
