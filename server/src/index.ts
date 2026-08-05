import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { config } from 'dotenv';

config({ path: '.env' });

const app = new Hono();

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
);

app.get('/health', (c) => {
  return c.json({ success: true, message: 'Server is running' }, 200);
});

app.notFound((c) => {
  return c.json({ success: true, message: 'Route not found!' }, 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal server error' }, 500);
});

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    serve({ fetch: app.fetch, port }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    });
  } catch (error) {
    console.error('Failed to start server and connect database: ', error);
    process.exit(1);
  }
};

await startServer();
