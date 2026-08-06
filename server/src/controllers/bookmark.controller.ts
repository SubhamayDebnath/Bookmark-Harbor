import type { Context } from 'hono';
import { Types } from 'mongoose';
import Bookmark from '@/models/bookmark.model.js';
import {
  createBookmarkSchema,
  updateBookmarkSchema,
} from '@/validators/bookmark.validator.js';
import { sanitizeUrl } from '@/utils/sanitize-url.js';

export const createBookmark = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parsed = createBookmarkSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const userId = c.get('user').id;
    const { title, url } = parsed.data;

    let sanitizedUrl: string;
    try {
      sanitizedUrl = sanitizeUrl(url);
    } catch {
      return c.json(
        {
          success: false,
          message: 'Please provide a valid HTTP or HTTPS URL.',
        },
        400
      );
    }

    const existing = await Bookmark.findOne({
      user: userId,
      url: sanitizedUrl,
    });
    if (existing) {
      return c.json(
        {
          success: false,
          message: 'This bookmark already exists.',
        },
        409
      );
    }

    const bookmark = await Bookmark.create({
      user: userId,
      title,
      url: sanitizedUrl,
    });

    return c.json(
      {
        success: true,
        message: 'Bookmark created.',
        data: {
          bookmark,
        },
      },
      201
    );
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const listBookmarks = async (c: Context) => {
  try {
    const userId = c.get('user').id;
    const page = Math.max(Number(c.req.query('page') ?? 1), 1);
    const limit = Math.max(Number(c.req.query('limit') ?? 10), 1);
    const skip = (page - 1) * limit;
    const q = c.req.query('q');
    const filter = (c.req.query('filter') ?? 'all').toLowerCase();
    const match: any = {
      user: new Types.ObjectId(userId),
    };

    if (q) {
      match.$or = [
        { title: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } },
      ];
    }

    const sort: Record<string, 1 | -1> =
      filter === 'later' ? { createdAt: 1 } : { createdAt: -1 };

    const [bookmarks, total] = await Promise.all([
      Bookmark.find(match).sort(sort).skip(skip).limit(limit),
      Bookmark.countDocuments(match),
    ]);

    return c.json(
      {
        success: true,
        message: 'Bookmarks retrieved.',
        data: {
          bookmarks,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
          },
        },
      },
      200
    );
  } catch (error) {
    console.error('Error listing bookmarks:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const updateBookmark = async (c: Context) => {
  try {
    const id = c.req.param('id');
    if (!Types.ObjectId.isValid(String(id))) {
      return c.json({ success: false, message: 'Invalid bookmark.' }, 400);
    }
    const body = await c.req.json();
    const parsed = updateBookmarkSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const userId = c.get('user').id;
    const bookmark = await Bookmark.findOne({
      _id: id,
      user: userId,
    });
    if (!bookmark) {
      return c.json({ success: false, message: 'Bookmark not found.' }, 404);
    }

    const { title, url } = parsed.data;

    if (title) {
      bookmark.title = title;
    }

    if (url) {
      let sanitizedUrl: string;
      try {
        sanitizedUrl = sanitizeUrl(url);
      } catch {
        return c.json(
          {
            success: false,
            message: 'Please provide a valid HTTP or HTTPS URL.',
          },
          400
        );
      }
      const existing = await Bookmark.findOne({
        _id: { $ne: id },
        user: userId,
        url: sanitizedUrl,
      });
      if (existing) {
        return c.json(
          {
            success: false,
            message: 'This bookmark already exists.',
          },
          409
        );
      }
      bookmark.url = sanitizedUrl;
    }

    await bookmark.save();

    return c.json(
      {
        success: true,
        message: 'Bookmark updated.',
        data: {
          bookmark,
        },
      },
      200
    );
  } catch (error) {
    console.error('Error updating bookmark:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const deleteBookmark = async (c: Context) => {
  try {
    const id = c.req.param('id');
    if (!Types.ObjectId.isValid(String(id))) {
      return c.json({ success: false, message: 'Invalid bookmark.' }, 400);
    }
    const userId = c.get('user').id;
    const bookmark = await Bookmark.findOne({
      _id: id,
      user: userId,
    });
    if (!bookmark) {
      return c.json({ success: false, message: 'Bookmark not found.' }, 404);
    }
    await bookmark.deleteOne();
    return c.json(
      {
        success: true,
        message: 'Bookmark deleted.',
      },
      200
    );
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};
