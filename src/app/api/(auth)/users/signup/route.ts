import { NextResponse , NextRequest } from "next/server";
import {connect} from '@/app/lib/db'
import User from "@/app/lib/modals/user";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";

connect()

export const POST=async(request:NextRequest)=>{
   try {
    const body = await request.json()
    const {name , email , password} = await body
    if(!name || !email || !password){
        return new NextResponse(JSON.stringify({message:"Add all the required fields"}),{status:400})
    }
    if(password.length<8){
        return new NextResponse(JSON.stringify({message:"Password should of minimum 8 characters"}),{status:400})
    }

    const existingUser = await User.findOne({
        email
    })
    if(existingUser){
        return new NextResponse(JSON.stringify({message:"User already exists"}),{status:409})
    }

    const saltRounds=12
    const hashPassword = await bcrypt.hash(password , saltRounds)

    
     const user = await User.create({
        name:name,
        email:email,
        password:hashPassword
     })
     const savedUser = await user.save()
    
     await sendEmail({email , emailType:'VERIFY', userId:savedUser._id})

     return new NextResponse(JSON.stringify({message:"User signedUp successfully", savedUser}),{status:200})
   } catch (error) {
    return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
   }
}