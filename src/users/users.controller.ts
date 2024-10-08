import { Context } from "hono";
import { deleteUserService, emailExits, getAllUserService,  getOneUserServiceId, registerUserService } from "./users.service";

export const registerUser = async(c: Context)=>{
    try {
        const user = await c.req.json()
        delete user.password;
        const exits =await emailExits(user.email)
        console.log(exits)
        if(exits){
            return c.json({'mesage':'Email already exists'})
        }
        const registeredUser = await registerUserService(user)
        return c.json(registeredUser)
    } catch (error: any) {
        return c.json({'error':error?.message})
        
    }
}

export const getAllUsers = async(c: Context)=>{
    try {
        const users = await getAllUserService()
        return c.json(users)
    } catch (error: any) {
        return c.json({'error':error?.message})
    }
}

export const getOneUser = async(c: Context)=>{
    try {
        const id = c.req.param("id")
        const user = await getOneUserServiceId(id)
        if(!user){
            return c.json({'error':'User not found'})
        }
        return c.json(user)
    } catch (error: any) {
        return c.json({'error':error?.message})
    }
}

export const deleteUser = async(c: Context)=>{
    try {
        const id = c.req.param('id')
        const results = await deleteUserService(id)
        if(!results){
            return c.json({'error':'User not found'})
        }
        return c.json(results)
    } catch (error: any) {
        return c.json({'error':error?.message})        
    }
}