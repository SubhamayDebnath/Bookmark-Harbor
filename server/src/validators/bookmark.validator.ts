import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const urlSchema = z
  .string()
  .trim()
  .min(1, { message: 'Bookmark URL is required.' })
  .url({ message: 'Please provide a valid URL.' })
  .refine(
    (value) => {
      try {
        const protocol = new URL(value).protocol;
        return protocol === 'http:' || protocol === 'https:';
      } catch {
        return false;
      }
    },
    {
      message: 'Only HTTP and HTTPS URLs are allowed.',
    }
  );

export const createBookmarkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Bookmark title is required.' })
    .max(150, {
      message: 'Bookmark title cannot exceed 150 characters.',
    }),
  url: urlSchema,
});

export const updateBookmarkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Bookmark title is required.' })
    .max(150, {
      message: 'Bookmark title cannot exceed 150 characters.',
    })
    .optional(),
  url: urlSchema.optional(),
});
