import { Hono } from 'hono';
import authRouter from '@/routes/auth.routes.js';
import adminRouter from '@/routes/admin.routes.js';
import { listColors } from '@/controllers/color.controller.js';

const router = new Hono();

router.route('/auth', authRouter);
router.route('/admin', adminRouter);

router.get('/color', listColors);

export default router;
