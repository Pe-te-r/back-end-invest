import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import { usersRoute } from './users/users.route';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { cors } from 'hono/cors';

// Load environment variables from .env file
dotenv.config();

const app = new Hono().basePath('/api')

// app.use(logger())  //logs request and response to the console
// app.use(csrf()) //prevents CSRF attacks by checking request headers.
// app.use(trimTrailingSlash()) 

app.use(cors({
  origin: '*', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));


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
