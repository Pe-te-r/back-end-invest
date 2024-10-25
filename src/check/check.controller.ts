import { Context } from "hono";

export const check_ok_controller=(c: Context)=>{
    try {
        return c.json({'ok': true});
    } catch (error: any) {
        return c.json({'error': error?.message})        
    } 
}   