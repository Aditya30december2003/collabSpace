import { NextResponse , NextRequest } from "next/server";
import {connect} from '@/app/lib/db'
import User from "@/app/lib/modals/user";

connect()

export const POST=async(request:NextRequest)=>{
    try {
        const body = request.json()
        const {token} = await body

        if(!token){
            return new NextResponse(JSON.stringify({message:"No verify token available"}),{status:400})
        }

        const user = await User.findOne({verifyToken:token , verifyTokenExpiry: {$gt:Date.now()}}) // time greater+3600000

        if(!user){
            return new NextResponse(JSON.stringify({message:"User not verified"}),{status:400})
        }

        //clean up process
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;


        await user.save()

        return new NextResponse(JSON.stringify({message:"Email verified successfully",success:true}),{status:200})

    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error:"+error}),{status:500})
    }
}