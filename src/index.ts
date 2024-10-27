import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import { usersRoute } from './users/users.route';

import { cors } from 'hono/cors';
import { check_ok } from './check/check.route';
import { book_server } from './book_server/book_server.route';

// Load environment variables from .env file
dotenv.config();

const app = new Hono().basePath('/api')



app.use(cors({
  origin: '*', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));


// app.get('/ok', (c) => {
//   return c.text('The server is running📢😏😏😏!')
// })

app.route('/',usersRoute)
app.route('/',check_ok)
app.route('/',book_server)

const port = Number(process.env.PORT);
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
