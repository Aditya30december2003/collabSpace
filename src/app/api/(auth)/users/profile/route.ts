import { NextResponse, NextRequest } from "next/server";
import { connect } from '@/app/lib/db'
import User from "@/app/lib/modals/user";
import { getDatafromToken } from "@/app/helpers/getDatafromToken";

connect()

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")
        
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "Not a valid userId" }), { status: 400 })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 400 })
        }

        // Fix: Properly structure the response
        return new NextResponse(JSON.stringify({
            message: "User data fetched",
            data: user
        }), { status: 200 })

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error: " + error }), { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const userId = await getDatafromToken(request)
        
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "User id not found" }), { status: 400 })
        }
        
        const user = await User.findById(userId).select("-password")
        
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 })
        }
        
        return new NextResponse(JSON.stringify({
            message: "User found",
            data: user
        }), { status: 200 })
        
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error: " + error }), { status: 500 })
    }
}