import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { authTable, usersTable } from "../drizzle/schema"

export const registerUserService = async(user: any)=>{
    const id = await db.insert(usersTable).values(user).returning({id: usersTable.id}).execute()
    return id[0]
}

export const emailExits = async(email: string): Promise<boolean>=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result.length > 0;
}

export const getOneUserServiceEmail = async(email:string)=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result[0] ?? null;
}

export const getOneUserServiceId = async(id: string)=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return result[0]?? null;
}

export const updateUserService = async(id: string, user: any)=>{
    const result = await db.update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id));
    
    return result;
}

export const getAllUserService = async()=>{
    const result = await db.select().from(usersTable);
    return result;
}

export const deleteUserService = async(id: string)=>{
    const result = await db.delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning({'id':usersTable.id}).execute();
    return result[0] ?? null;
}

export const store_passwrod = async(user_id:string,password:string) =>{
    const id = await db.insert(authTable).values({user_id:user_id,password:password}).returning({id: usersTable.id}).execute()
    return id[0]
}