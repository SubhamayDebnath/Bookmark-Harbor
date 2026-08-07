import type { Context } from 'hono';
import mongoose from 'mongoose';
import os from 'os';
import User from '@/models/user.model.js';
import Bookmark from '@/models/bookmark.model.js';

export const listUsers = async (c: Context) => {
  try {
    const page = Math.max(Number(c.req.query('page') ?? 1), 1);
    const limit = Math.max(Number(c.req.query('limit') ?? 10), 1);
    const skip = (page - 1) * limit;
    const q = c.req.query('q');
    const role = c.req.query('role');
    const isActive = c.req.query('isActive');

    const match: any = {};

    if (q) {
      match.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ];
    }

    if (role) {
      match.role = role;
    }

    if (isActive === 'true' || isActive === 'false') {
      match.isActive = isActive === 'true';
    }

    const [users, total] = await Promise.all([
      User.find(match).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(match),
    ]);

    return c.json(
      {
        success: true,
        message: 'Users retrieved.',
        data: {
          users,
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
    console.error('Error listing users:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const getUser = async (c: Context) => {
  try {
    const id = c.req.param('id');
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return c.json({ success: false, message: 'Invalid user.' }, 400);
    }

    const user = await User.findById(id);
    if (!user) {
      return c.json({ success: false, message: 'User not found.' }, 404);
    }

    const bookmarkCount = await Bookmark.countDocuments({ user: user._id });

    return c.json(
      {
        success: true,
        message: 'User retrieved.',
        data: {
          user,
          stats: {
            bookmarkCount,
          },
        },
      },
      200
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const getStats = async (c: Context) => {
  try {
    const [totalUsers, activeUsers, adminCount, totalBookmarks] =
      await Promise.all([
        User.countDocuments({}),
        User.countDocuments({ isActive: true }),
        User.countDocuments({ role: 'admin' }),
        Bookmark.countDocuments({}),
      ]);

    // Mongo storage stats
    let mongoStats = null;
    if (mongoose.connection.db) {
      const dbStats = await mongoose.connection.db.stats();
      mongoStats = {
        db: dbStats.db,
        collections: dbStats.collections,
        objects: dbStats.objects,
        avgObjSize: dbStats.avgObjSize,
        dataSize: dbStats.dataSize,
        storageSize: dbStats.storageSize,
        indexes: dbStats.indexes,
        indexSize: dbStats.indexSize,
      };
    }

    // Server / process stats
    const memoryUsage = process.memoryUsage();
    const serverStats = {
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memory: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      },
      cpuCount: os.cpus().length,
      loadAverage: os.loadavg(),
      totalSystemMemory: os.totalmem(),
      freeSystemMemory: os.freemem(),
    };

    return c.json(
      {
        success: true,
        message: 'Stats retrieved.',
        data: {
          users: {
            total: totalUsers,
            active: activeUsers,
            inactive: totalUsers - activeUsers,
            admins: adminCount,
          },
          bookmarks: {
            total: totalBookmarks,
          },
          mongo: mongoStats,
          server: serverStats,
        },
      },
      200
    );
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const updateUserRole = async (c: Context) => {
  try {
    const id = c.req.param('id');
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return c.json({ success: false, message: 'Invalid user.' }, 400);
    }

    const currentUser = c.get('user');
    if (currentUser.id === id) {
      return c.json(
        { success: false, message: 'You cannot change your own role.' },
        400
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return c.json({ success: false, message: 'User not found.' }, 404);
    }

    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();

    return c.json(
      {
        success: true,
        message: `User role updated to ${user.role}.`,
        data: { user },
      },
      200
    );
  } catch (error) {
    console.error('Error updating user role:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const toggleUserActive = async (c: Context) => {
  try {
    const id = c.req.param('id');
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return c.json({ success: false, message: 'Invalid user.' }, 400);
    }

    const currentUser = c.get('user');
    if (currentUser.id === id) {
      return c.json(
        { success: false, message: 'You cannot deactivate your own account.' },
        400
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return c.json({ success: false, message: 'User not found.' }, 404);
    }

    user.isActive = !user.isActive;
    await user.save();

    return c.json(
      {
        success: true,
        message: user.isActive ? 'User activated.' : 'User deactivated.',
        data: { user },
      },
      200
    );
  } catch (error) {
    console.error('Error toggling user active state:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};
