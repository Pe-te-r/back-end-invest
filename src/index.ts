import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import { usersRoute } from './users/users.route';

// Load environment variables from .env file
dotenv.config();

const app = new Hono().basePath('/api')

app.get('/ok', (c) => {
  return c.text('The server is running📢😏😏😏!')
})

app.route('/',usersRoute)

const port = Number(process.env.PORT);
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
