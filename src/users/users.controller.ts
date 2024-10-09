import { Context } from "hono";
import { deleteUserService, emailExits, getAllUserService,  getOneUserServiceId, registerUserService } from "./users.service";
import { sendMail } from "../send_mails/SendMails";

// Define a sleep function using Promise
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Example usage in an async function
async function executeTask() {
  console.log('Task started');
  
  // Wait for 5 seconds (5000 milliseconds)
  await sleep(5000);
  
  console.log('Task resumed after 5 seconds');
}


export const registerUser = async(c: Context)=>{
    try {
        const user = await c.req.json()
        delete user.password;
        sendMail('register',user.email,'Welcome to crypto mining site','peter')
        const exits =await emailExits(user.email)
        console.log(exits)
        if(exits){
            return c.json({'message':'Email already exists'})
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