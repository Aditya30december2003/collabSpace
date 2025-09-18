// src/app/helpers/getDatafromToken.ts
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Decoded extends JwtPayload {
  userId: string;
}

export const getDatafromToken = async (
  request: NextRequest
): Promise<string | null> => {
  try {
    const token = request.cookies.get("token")?.value ?? "";
    if (!token) return null;

    const secret = process.env.SECRET_KEY;
    if (!secret) {
      // Consider throwing so you can catch upstream and return 500 from the route
      return null;
    }

    const decoded = jwt.verify(token, secret) as Decoded | string;

    if (typeof decoded === "string") return null;
    return decoded.userId ?? null;
  } catch {
    return null; // don’t return a NextResponse from a helper
  }
};
