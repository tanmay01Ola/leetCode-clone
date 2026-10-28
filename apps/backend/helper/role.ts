import { db } from "db";

export async function hasRole(userId : string){
    const user = await db.orm.public.User.where({id : userId}).first()
    return user?.role
}