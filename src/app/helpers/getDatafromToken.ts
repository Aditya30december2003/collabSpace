import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const getDatafromToken=async(request:NextRequest)=>{
   try {
     const token = request.cookies.get("token")?.value || ""
     console.log(token)
     const decodedToken:any =jwt.verify(token , process.env.SECRET_KEY!)

     console.log(decodedToken)

     return decodedToken.userId
   } catch (error) {
    return new NextResponse(JSON.stringify({message:"Error"+error}),{status:500})
   }
}