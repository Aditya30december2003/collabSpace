import { NextResponse , NextRequest } from "next/server";
import {connect} from '@/app/lib/db'
import User from "@/app/lib/modals/user";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";
import jwt from 'jsonwebtoken'

connect()

export const POST=async()=>{ // can be get or post 🔥🔥🔥
    try {
        const response = new NextResponse(JSON.stringify(
            {message:"Logout successfully"}
        ),{status:200})
        
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return response

    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error:"+error}),{status:500})
    }
}