import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { authTable, usersTable } from "../drizzle/schema"
import { NONCE } from "hono/secure-headers"

export const registerUserService = async(user: any)=>{
    const id = await db.insert(usersTable).values(user).returning({id: usersTable.id}).execute()
    return id[0]
}

export const emailExits = async(email: string): Promise<boolean>=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result.length > 0;
}

export const getOneUserServiceEmail = async(email:string,password?:boolean)=>{
    if(password){
        const result =await db.query.usersTable.findFirst({
            where: eq(usersTable.email,email),
            with:{
                auth:{
                    columns:{
                        password:true,
                    }
                }
            }
        })
        
        return result?? null;
        }
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
    return result[0] ?? null;
}


export const setCode= async(id: string,code: string)=>{
    await db
    .update(usersTable)
    .set({
      promo_code_owner: String(code),
    })
    .where(eq(usersTable.id, id));
    return true
}

export const getCode = async(id:string,code:string)=>{
    const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
    console.log(result)
    if(String(result[0].promo_code_owner) == String(code)){
        await db.update(usersTable)
        .set({
            verified: true,
            promo_code_owner: null,
        })
        .where(eq(usersTable.id, id));
        return true
    }
    return false;
}

export const getOneUserServiceId = async(id: string,password?:boolean)=>{
        const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
        return result?? undefined;
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

export const store_passwrod = async (user_id: string, password: string) => {
    const result = await db.insert(authTable)
      .values({ user_id: user_id, password: password })
      .returning({ user_id: authTable.user_id });

    return result[0];
  }