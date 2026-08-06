import { Hono } from 'hono';
import { authenticate } from '@/middleware/auth.middleware.js';
import {
  createBookmark,
  listBookmarks,
  updateBookmark,
  deleteBookmark,
} from '@/controllers/bookmark.controller.js';

const bookmarkRouter = new Hono();

bookmarkRouter.post('/', authenticate, createBookmark);
bookmarkRouter.get('/', authenticate, listBookmarks);
bookmarkRouter.patch('/:id', authenticate, updateBookmark);
bookmarkRouter.delete('/:id', authenticate, deleteBookmark);

export default bookmarkRouter;
