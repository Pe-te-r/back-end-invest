import { Hono } from "hono";
import { allMiddleware } from "../middlewares/middleware";
import { check_ok_controller } from "./check.controller";

export const check_ok = new Hono()

check_ok.get('/ok',allMiddleware,check_ok_controller)
