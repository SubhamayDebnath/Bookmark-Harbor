import { z } from 'zod';

export const createColorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Color name is required.' })
    .max(30, { message: 'Color name cannot exceed 30 characters.' }),
  hex: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{6})$/, {
      message: 'Enter a valid hex code, e.g. #3B82F6.',
    }),
  type: z.enum(['folder', 'tag', 'both']),
  isDefault: z.boolean().optional(),
});

export const updateColorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Color name is required.' })
    .max(30, { message: 'Color name cannot exceed 30 characters.' })
    .optional(),
  hex: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{6})$/, {
      message: 'Enter a valid hex code, e.g. #3B82F6.',
    })
    .optional(),
  type: z.enum(['folder', 'tag', 'both']).optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
});
