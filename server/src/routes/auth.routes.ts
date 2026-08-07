import { Hono } from 'hono';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
  getUser,
} from '@/controllers/auth.controller.js';
import { authenticate } from '@/middleware/auth.middleware.js';

const authRouter = new Hono();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', authenticate, logoutUser);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/change-password', authenticate, changePassword);
authRouter.get('/me', authenticate, getUser);

export default authRouter;
