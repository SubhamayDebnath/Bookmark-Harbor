import { Schema, model } from 'mongoose';
import type { IUser } from '@/types/user.types.js';
import { ROLES } from '@/constants.js';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
      maxlength: [50, 'Name cannot exceed 50 characters.'],
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address.',
      ],
    },

    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: ROLES,
        message: 'Invalid user role.',
      },
      default: ROLES[1],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    passwordResetToken: {
      type: String,
      default: null,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
      select: false,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
    strict: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
