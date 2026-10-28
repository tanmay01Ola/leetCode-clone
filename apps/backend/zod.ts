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

export const problemBody = z.object({
   problemStatement : z.string(),
   description  : z.string().optional(),
   difficultyLevel : z.enum(['easy', 'medium' ,'hard']),
   memoryLimit : z.number(),
   CPULimit : z.number()
})