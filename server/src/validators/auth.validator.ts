import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ error: 'Please enter a valid email address.' });

const passwordSchema = z
  .string()
  .trim()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,32}$/,
    {
      error:
        'Password must be 8-32 characters and include uppercase, lowercase, number and special character',
    }
  );

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: 'Name must be at least 2 characters.' })
    .max(50, { error: 'Name cannot exceed 50 characters.' }),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, { error: 'Password is required.' }),
});
