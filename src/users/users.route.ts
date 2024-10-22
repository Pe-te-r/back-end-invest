import { Hono } from "hono";
import { deleteUser, getAllUsers, getOneUser, loginUser, registerUser } from "./users.controller";
import { allMiddleware } from "../middlewares/middleware";

export const usersRoute = new Hono()

usersRoute.get('/users/:id',allMiddleware,getOneUser)
usersRoute.get('/users',getAllUsers)
usersRoute.post('/users',registerUser)
usersRoute.post('/login',loginUser)
usersRoute.delete('/users/:id',deleteUser)