import { connect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/lib/modals/user";
import { Types } from "mongoose";

export const GET=async()=>{
    try {
    connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users),{status:200})
    } catch (error) {
        return new NextResponse("Error:"+error,{status:500})
    }
}  

export const POST=async(request:NextRequest)=>{
    try {
    const body = await request.json();

    await connect();

    const user = new User(body)

    await user.save();

    return new NextResponse(JSON.stringify({user:user , message:"User created"}),{status:200})
    } catch (error) {
        return new NextResponse("Error:"+error,{status:500})
    }
}

export const PATCH=async(request:NextRequest)=>{
    try {
        const body = await request.json();
    const {userId , name} = body
    
    if(!userId || !name){
        return new NextResponse(JSON.stringify({message:"user or user id not found"}),{status:400})
    }
    if(!Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message:"user id not valid"}),{status:400})
    }
    await connect();
    const updateUser = await User.findByIdAndUpdate(userId,
        {name:name},
        {new:true}
    )

    if(!updateUser){
        return new NextResponse(JSON.stringify({message:"Updated user does not exist"}),{status:400})
    }
    return new NextResponse(JSON.stringify({message:"User name is updated" , name:name}), {status:200})
    } catch (error) {
        return new NextResponse("Error:"+error,{status:500})
    }
}

export const DELETE=async(request:NextRequest)=>{
    try {
        const body = await request.json();
       const{userId} = body;

       if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message:"User id not found"}),{status:400})
       }
       connect()
       await User.findByIdAndDelete(userId)

       return new NextResponse(JSON.stringify({message:"User is deleted"}),{status:200})
    } catch (error) {
         return new NextResponse("Error:"+error,{status:500})
    }
}