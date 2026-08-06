import { Hono } from 'hono';
import authRouter from '@/routes/auth.routes.js';
import bookmarkRouter from '@/routes/bookmark.routes.js';

const router = new Hono();

router.route('/auth', authRouter);
router.route('/bookmark', bookmarkRouter);

export default router;
