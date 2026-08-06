import { Hono } from 'hono';
import { authenticate, authorize } from '@/middleware/auth.middleware.js';
import {
  createColor,
  deleteColor,
  listColors,
  updateColor,
} from '@/controllers/color.controller.js';

const adminRouter = new Hono();

adminRouter.get('/color', authenticate, authorize('admin'), listColors);
adminRouter.post('/color', authenticate, authorize('admin'), createColor);
adminRouter.patch('/color/:id', authenticate, authorize('admin'), updateColor);
adminRouter.delete('/color/:id', authenticate, authorize('admin'), deleteColor);

export default adminRouter;
