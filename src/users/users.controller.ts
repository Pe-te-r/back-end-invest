import { Context } from "hono";
import { emailExits, registerUserService } from "./users.service";

export const registerUser = async(c: Context)=>{
    const user = await c.req.json()
    const exits =await emailExits(user.email)
    if(exits){
        return c.json({'mesage':'Email already exists'})
    }
    const registeredUser = await registerUserService(user)
}