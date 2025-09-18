import { NextRequest, NextResponse } from "next/server";
import User from "@/app/lib/modals/user";
import { connect } from "@/app/lib/db";
import bcrypt from "bcryptjs";

connect()

export const PATCH=async(request:NextRequest)=>{
    try {
        const body = await request.json();
        const {email , updatedPassword} = await body

        if(!email){
            return new NextResponse(JSON.stringify({message:"Enter correct email id"}),{status:400})
        }

        const user = await User.findOne({email})

        if(!user){
            return new NextResponse(JSON.stringify({message:"User does not exist"}),{status:400})
        }

        const saltRounds = 12
        const hashedPassword =await  bcrypt.hash(updatedPassword , saltRounds)

        const updatedUser = await User.findByIdAndUpdate(user._id,{
            password:hashedPassword
        })

        await updatedUser.save()

        return new NextResponse(JSON.stringify({message:"Password updated" , password:hashedPassword}),{status:200})

    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
    }
}