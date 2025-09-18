import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/db";
import Save from "@/app/lib/modals/saved";
import { Types } from "mongoose";
import Idea from "@/app/lib/modals/idea";

connect();

export const GET=async(req:NextRequest)=>{
    try {
        const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")

    if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message:"User id not valid"}),{status:400})
    }

    const save= await Save.find({
        user:userId
    }).populate({path:"idea user", select:"title description name email "})

    if(!save){
        return new NextResponse(JSON.stringify({message:"Save does not exist"}),{status:400})
    }
 
    return new  NextResponse(JSON.stringify(save),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
    }
}

export const POST=async(req:NextRequest)=>{
    try {
        const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")
    const ideaId = searchParams.get("ideaId")

    if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message:"User id not valid"}),{status:400})
    }
    if(!ideaId || !Types.ObjectId.isValid(ideaId)){
        return new NextResponse(JSON.stringify({message:"Idea id not valid"}),{status:400})
    }

    const newSave = await Save.create({
        user:userId,
        idea:ideaId,
    })

    if(!newSave){
     return new NextResponse(JSON.stringify({message:"Save does not exist"}),{status:400})
    }

    return new NextResponse(JSON.stringify(newSave),{status:200})
    } catch (error) {
       return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500}) 
    }
}

export const DELETE=async(req:NextRequest)=>{
 try {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")
    const ideaId = searchParams.get("ideaId")

    if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message:"User id not valid"}),{status:400})
    }

    await Save.deleteOne({
        user:userId,
        idea:ideaId
    })
    

    return new NextResponse(JSON.stringify({message:"Idea deleted"}),{status:200})
 } catch (error) {
    return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
 }
}