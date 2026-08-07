import { Hono } from 'hono';
import {
  listUsers,
  getUser,
  getStats,
  updateUserRole,
  toggleUserActive,
} from '@/controllers/admin.controller.js';
import { authenticate, authorize } from '@/middleware/auth.middleware.js';

const adminRouter = new Hono();

adminRouter.get('/stats', authenticate, authorize('admin'), getStats);
adminRouter.get('/users', authenticate, authorize('admin'), listUsers);
adminRouter.get('/users/:id', authenticate, authorize('admin'), getUser);
adminRouter.patch(
  '/users/:id/role',
  authenticate,
  authorize('admin'),
  updateUserRole
);
adminRouter.patch(
  '/users/:id/active',
  authenticate,
  authorize('admin'),
  toggleUserActive
);

export default adminRouter;
