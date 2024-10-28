import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import "dotenv/config";
// import { decode } from "punycode";

export const verifyToken = async (token: string, secret: string) => {
  try {
    const decoded = await verify(token as string, secret);
    return decoded;
  } catch (error: any) {
    return null;
  }
};
export const authMiddleware = async (c: Context, next: Next, role: string) => {
  const token = c.req.header("Authorization");
  if (!token) return c.json({ error: "unauthorized no token provided" }, 401);
  const decoded = await verifyToken(token, process.env.SECRET_KEY as string);
  if (!decoded) return c.json({ error: "token not valid" });
  if (decoded.role !== role)
    return c.json({ msg: "you are unauthorized" }, 401);
  return next();
};

export const allMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization");
  console.log('here')
  if (!token) return c.json({ error: "no token" }, 401);
  const decoded = await verifyToken(token, process.env.SECRET_KEY as string);
  if (!decoded) return c.json({ error: 'expired' });
  return next();
};


export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");
export const adminRoleAuth = async (c: Context, next: Next) =>await authMiddleware(c, next, "admin");
export const allRoleAuth = async (c: Context, next: Next) =>await allMiddleware(c, next);