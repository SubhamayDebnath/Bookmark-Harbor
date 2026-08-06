import { Hono } from 'hono';
import authRouter from '@/routes/auth.routes.js';

const router = new Hono();

router.route('/auth', authRouter);

export default router;
