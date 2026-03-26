import { NextRequest, NextResponse } from "next/server";
import { createReply } from "../../../controllers/replyController";
import dbConnect from "@/config/dbConnect";

// Standard CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Or your specific Vercel domain
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 1. Handle OPTIONS request (Required for CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 2. Updated POST request
export async function POST(req: NextRequest) {
  try {
    // Ensure DB is connected before running controller logic
    await dbConnect();

    const data = await req.json();
    
    // Call your controller
    const result = await createReply(data);

    // Return the result with CORS headers
    return NextResponse.json(result, {
      status: 201,
      headers: corsHeaders,
    });

  } catch (err: any) {
    console.error("Route Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { 
        status: 500, 
        headers: corsHeaders 
      }
    );
  }
}