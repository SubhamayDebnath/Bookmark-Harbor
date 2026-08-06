import { Hono } from 'hono';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from '@/controllers/auth.controller.js';
import { authenticate } from '@/middleware/auth.middleware.js';

const authRouter = new Hono();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', authenticate, logoutUser);
authRouter.get('/me', authenticate, getUser);

export default authRouter;
