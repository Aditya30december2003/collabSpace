import { connect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Idea from "@/app/lib/modals/idea";
import { Types } from "mongoose";

connect()

export const GET = async(req: NextRequest, { params }:{ params:  Promise<{ slug: string }> }) => {
    try {
        // Get the ideaId from the dynamic route parameter, not searchParams
        const { slug } = await params; // 👈 await the params 
        const ideaId = slug;
        
        if (!ideaId || !Types.ObjectId.isValid(ideaId)) {
            return new NextResponse(JSON.stringify({ message: "Idea id is invalid" }), { status: 400 })
        }

        // Use _id to find the document, not ideaId field
        const idea = await Idea.findById(ideaId).populate({ path: "user", select: "name email isVerified" }) // no password
    .lean();
        
        if (!idea) {
            return new NextResponse(JSON.stringify({ message: "Idea not found" }), { status: 404 })
        }

        // Return the idea data directly
        return new NextResponse(JSON.stringify(idea), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error: " + error }), { status: 500 })
    }
}