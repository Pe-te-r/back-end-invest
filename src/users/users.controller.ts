import { Context } from "hono";
import { deleteUserService, emailExits, getAllUserService,  getOneUserServiceId, registerUserService, store_passwrod } from "./users.service";
import { sendMail } from "../send_mails/SendMails";
import bcrypt from 'bcrypt'; 

// Define a sleep function using Promise
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Example usage in an async function
async function executeTask() {
  console.log('Task started');
  
  // Wait for 5 seconds (5000 milliseconds)
  await sleep(5000);
  
  console.log('Task resumed after 5 seconds');
}

// register
export const registerUser = async(c: Context)=>{
    try {
        const user = await c.req.json()
        const password =  user.password;
        const saltRounds = 10;
        delete user.password;
        const hashed_password =await
         bcrypt.hash(password,saltRounds);
        const exits =await emailExits(user.email)
        if(exits){
            return c.json({'message':'Email already exists'})
        }
        const registeredUser = await registerUserService(user)
        const user_id = registerUser.id
        const pass_id = await store_passwrod(user_id,hashed_password)
        await sendMail('register',user.email,'Welcome to Peer Mining',user.first_Name)
        return c.json(pass_id)
    } catch (error: any) {
        return c.json({'error':error?.message})
        
    }
}

export const loginUser = async(c: Context)=>{
    try {
        const user = await c.req.json()
        const exits =await emailExits(user.email)
        if(exits){
            const isPasswordValid = await bcrypt.compare(password, user.password);
        }

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