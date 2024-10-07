import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { usersTable } from "../drizzle/schema"

export const registerUserService = async(user: any)=>{
    const id = await db.insert(usersTable).values(user).returning({id: usersTable.id}).execute()
    return id[0]
}

export const emailExits = async(email: string): Promise<boolean>=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result.length > 0;
}

export const getOneUserService = async(email:string)=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result[0] ?? null;
}

export const updateUserService = async(id: string, user: any)=>{
    const result = await db.update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id));
    
    return result;
}