import type { Role } from '@/constants.js';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  emailVerified: boolean;
  isActive: boolean;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
