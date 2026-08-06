import { Schema, model, type Document } from 'mongoose';
import type { IColor } from '@/types/color.types.js';

export interface ColorDocument extends IColor, Document {}

const colorSchema = new Schema<ColorDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      unique: true,
      maxlength: 30,
    },
    hex: {
      type: String,
      required: [true, 'Hex is required.'],
      trim: true,
      uppercase: true,
      unique: true,
      match: [
        /^#([0-9A-F]{6})$/,
        'Color must be a valid hex code, e.g. #3B82F6',
      ],
    },
  },
  { timestamps: true }
);

const Color = model<ColorDocument>('Color', colorSchema);

export default Color;
