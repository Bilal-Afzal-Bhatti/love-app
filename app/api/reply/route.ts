import { NextRequest } from "next/server";
import { createReply } from "../../../controllers/replyController";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    return await createReply(data);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}