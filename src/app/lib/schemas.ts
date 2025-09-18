import {z} from 'zod'

export const signInSchema  = z.object({
    email:z.string().email(),
    password:z.string().min(3) // minimum 3 characters
})

export const signUpSchema = z.object({
    email:z.string().email(),
    name: z.string().min(2),
    password: z.string().min(8)
})