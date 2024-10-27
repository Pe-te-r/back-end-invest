import { Context } from "hono";
import { book_service, get_book_service } from "./book_sevre.service";

function getFutureDate(daysToAdd: number) {
    // Get today's date
    const today = new Date();
    
    // Add the specified number of days
    today.setDate(today.getDate() + daysToAdd);
    
    return today;
  }

export const book_controller = async(c:Context)=>{
    try {
        const data = await c.req.json();
        const today = getFutureDate(data.days_hired)
        data.end_date=today
        const id = await book_service(data)
        return c.json({success: id})


    } catch (error: any) {
        return c.json({error:error?.message})
        
    }
}

export const get_book_controller= async(c:Context)=>{
    try {
        const id = c.req.param('user_id');
        console.log(id)
        const results = await get_book_service(id)
        return c.json({'book': results})
    } catch (error: any) {
        return c.json({error:error?.message})
    }
}