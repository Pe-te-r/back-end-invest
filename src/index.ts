import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = Number(process.env.PORT);
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
