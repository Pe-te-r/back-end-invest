import { Hono } from "hono";
import { deleteUser, getAllUsers, getOneUser, registerUser } from "./users.controller";

export const usersRoute = new Hono()

usersRoute.get('/users/:id',getOneUser)
usersRoute.get('/users',getAllUsers)
usersRoute.post('/users',registerUser)
usersRoute.post('/login',)
usersRoute.delete('/users/:id',deleteUser)