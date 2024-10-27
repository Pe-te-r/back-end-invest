import { Hono } from "hono";
import { book_controller } from "./book_server.controller";

export const book_server = new Hono()

book_server.post('/book',book_controller)