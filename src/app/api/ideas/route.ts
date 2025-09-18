import { connect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Idea from "@/app/lib/modals/idea";
import { Types } from "mongoose";

connect()

export const GET=async(request:NextRequest)=>{
    try {
        const {searchParams} = new URL(request.url)
    const userId = searchParams.get("userId")

    if(!userId || !Types.ObjectId.isValid(userId)){
     return new NextResponse(JSON.stringify({message:"User Id not valid"}),{status:400})
    }
    const ideas = await Idea.find({
       user:userId
    })

    return new NextResponse(JSON.stringify(ideas),{status:200})

    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
    }
}

export const POST=async(request:NextRequest)=>{
    try {
        const body= await request.json();
    const {title , description } = body
    const {searchParams} = new URL(request.url)
    const userId = searchParams.get("userId")

    if(!userId || !Types.ObjectId.isValid(userId)){
      return new NextResponse(JSON.stringify({message:"User id is not valid"}),{status:400})
    }

    const newIdea = await Idea.create({
        title: title ,
        description:description,
        user: userId
    })

    if(!title || !description){
        return new NextResponse(JSON.stringify({message:"title or description absent"}),{status:400})
    }
    await newIdea.save()
    return new NextResponse(JSON.stringify({newIdea}),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
    }
}