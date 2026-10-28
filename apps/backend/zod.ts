import z from "zod"

export const signupBody = z.object({
    username : z.string(),
    password : z.string(),
    email : z.string().email(),
    role : z.enum(['user' , 'admin'])
})

export const signinBody = z.object({
    email : z.string().email(),
    password : z.string()
})