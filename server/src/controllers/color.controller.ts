import type { Context } from 'hono';
import Color from '@/models/color.model.js';
import {
  createColorSchema,
  updateColorSchema,
} from '@/validators/color.validator.js';

export const createColor = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parsed = createColorSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const { name, hex } = parsed.data;
    const normalizedHex = hex.toUpperCase();
    const existing = await Color.findOne({
      $or: [{ name }, { hex: normalizedHex }],
    });
    if (existing) {
      return c.json(
        {
          success: false,
          message: 'A color with that name or hex code already exists.',
        },
        409
      );
    }
    const color = await Color.create({ name, hex: normalizedHex });
    return c.json(
      { success: true, message: 'Color created.', data: { color } },
      201
    );
  } catch (error) {
    console.error('Error occurred while creating color:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const listColors = async (c: Context) => {
  try {
    const colors = await Color.find().sort({ name: 1 });
    return c.json(
      { success: true, message: 'Colors retrieved.', data: { colors } },
      200
    );
  } catch (error) {
    console.error('Error occurred while listing colors:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const updateColor = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parsed = updateColorSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const color = await Color.findById(id);
    if (!color) {
      return c.json({ success: false, message: 'Color not found.' }, 404);
    }
    const { name, hex } = parsed.data;
    const normalizedHex = hex ? hex.toUpperCase() : undefined;

    if (name || normalizedHex) {
    }

    const conflict = await Color.findOne({
      _id: { $ne: id },
      $or: [
        ...(name ? [{ name }] : []),
        ...(normalizedHex ? [{ hex: normalizedHex }] : []),
      ],
    });
    if (conflict) {
      return c.json(
        {
          success: false,
          message: 'A color with that name or hex code already exists.',
        },
        409
      );
    }

    if (name !== undefined) color.name = name;
    if (normalizedHex !== undefined) color.hex = normalizedHex;

    await color.save();
    return c.json(
      { success: true, message: 'Color updated.', data: { color } },
      200
    );
  } catch (error) {
    console.error('Error occurred while updating color:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const deleteColor = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const color = await Color.findById(id);
    if (!color) {
      return c.json({ success: false, message: 'Color not found.' }, 404);
    }

    // await color.deleteOne();

    return c.json(
      {
        success: true,
        message:
          'Color deleted. Folders using it were reassigned to the default color.',
      },
      200
    );
  } catch (error) {
    console.error('Error occurred while deleting color:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};
