import { NextResponse , NextRequest } from "next/server";
import {connect} from '@/app/lib/db'
import User from "@/app/lib/modals/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

connect()

export const POST=async(request:NextRequest)=>{
    try {
        const body = await request.json()
        const {email , password} = body

        if(!email || !password){
            return new NextResponse(JSON.stringify({message:"email or password not entered"}),{status:400})
        }

        const user = await User.findOne({email})

        if(!user){
            return new NextResponse(JSON.stringify({message:"User does not exist"}),{status:400})
        }

       const check = await bcrypt.compare(password , user.password)

       if(!check){
        console.log("Password not correct")
        return new NextResponse(JSON.stringify({message:"Password not correct", }),{status:404})
       }

       const tokenData={
        userId:user._id,
        name: user.name,
        email:user.email
       }

       const token = await jwt.sign(tokenData , process.env.SECRET_KEY! , {expiresIn:'1D'}) 

       const response = new NextResponse(JSON.stringify({
        message:"User logged in",
       }),{status:200})

       response.cookies.set("token",token,{
        httpOnly:true
       })

       return response
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error:"+error}),{status:500})
    }
}