import { Context } from "hono";
import { deleteUserService, emailExits, getAllUserService,  getCode,  getOneUserServiceEmail,  getOneUserServiceId, registerUserService, setCode, store_passwrod } from "./users.service";
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
        // console.log(registeredUser.id)
        const user_id = registeredUser.id
        const pass_id = await store_passwrod(user_id,hashed_password)
        console.log(pass_id)
        await sendMail('register',user.email,'Welcome to Peer Mining',user.first_Name)
        return c.json(pass_id)
    } catch (error: any) {
        return c.json({'error':error?.message})
        
    }
}

function generateRandomCode(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }
  

export const loginUser = async(c: Context)=>{
    try {
        const user = await c.req.json()
        const exits =await emailExits(user.email)
        const code = generateRandomCode();
        if(exits){
            const user_details: any = await getOneUserServiceEmail(user.email,true)
            console.log(user_details)
            const isPasswordValid = await bcrypt.compare(String(user.password),String(user_details?.auth.password));
            if(!isPasswordValid){
                return c.json({'message': 'Invalid password'})
            }
            if(!user_details?.verified && !user.code){
                if(await setCode(user_details?.id,String(code))){
                    await sendMail('code',user?.email,'Here is your verifcation code',user_details.first_Name,String(code))
                    return c.json({'message':'code'})
                }
            }else if(!user_details?.verified && user.code){
                if(!await getCode(user.id,user?.code)){
                    return c.json({'message':'code is not a valid'})
                }
            }
            return c.json(user_details)
        }else{
            return c.json({'message': 'Email not found'})
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
        const user = await getOneUserServiceId(id,true)
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