import { Hono } from "hono";
import { book_controller,get_book_controller } from "./book_server.controller";

export const book_server = new Hono()

book_server.post('/book',book_controller)
book_server.get('/book/:user_id',get_book_controller)