import db from "../drizzle/db"
import { server_hire } from "../drizzle/schema"
import { eq } from "drizzle-orm"

export const book_service = async(details: any)=>{
    const id = await db.insert(server_hire).values(details).returning({id: server_hire.id}).execute()
    return id

}

export const get_book_service = async(user_id:string)=>{
    const result =await db.query.server_hire.findMany({
        where: eq(server_hire.user_id,user_id),
        columns:{
            server_id:true,
        }
    })
    return result
}