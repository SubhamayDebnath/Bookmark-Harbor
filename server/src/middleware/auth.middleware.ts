import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import User from '@/models/user.model.js';
import { verifyToken } from '@/utils/jwt.js';

export const authenticate = createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, 'token');
    if (!token) {
      return c.json({ success: false, message: 'Unauthorized.' }, 401);
    }
    const payload = verifyToken(token);
    const user = await User.findById(payload.userId);
    if (!user) {
      return c.json({ success: false, message: 'User not found.' }, 404);
    }
    if (!user.isActive) {
      return c.json({ success: false, message: 'Account is inactive.' }, 403);
    }
    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Authentication failed:', error);
    return c.json(
      { success: false, message: 'Invalid or expired token.' },
      401
    );
  }
});

export const authorize = (...roles: string[]) =>
  createMiddleware(async (c, next) => {
    const user = c.get('user');
    if (!roles.includes(user.role)) {
      return c.json({ success: false, message: 'Forbidden.' }, 403);
    }
    await next();
  });
