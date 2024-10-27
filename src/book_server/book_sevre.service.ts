import db from "../drizzle/db"
import { server_hire } from "../drizzle/schema"

export const book_service = async(details: any)=>{
    const id = await db.insert(server_hire).values(details).returning({id: server_hire.id}).execute()
    return id

}