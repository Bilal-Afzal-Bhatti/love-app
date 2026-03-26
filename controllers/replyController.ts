import { NextResponse } from "next/server";
import { Reply } from "../models/ReplyModel";
import dbConnect from "../config/dbConnect";
import { transporter } from "../lib/nodemailer";
import { handleError } from "../utils/apiError";

export const createReply = async (data: { email: string; reply: string }) => {
  try {
    await dbConnect();

    const { email, reply } = data;

    // 1. Save to MongoDB (Uses your working model)
    const newReply = await Reply.create({ 
      email: email, 
      reply: reply 
    });

    // 2. Send the Email to the person who just filled the form
    await transporter.sendMail({
      from: `"Love App" <${process.env.EMAIL_USER}>`, 
      to: email, // <--- This takes the email from the DB/Form data
      subject: "❤️ Your Response was Received!",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #ff4d6d; border-radius: 12px; text-align: center;">
          <h2 style="color: #ff4d6d;">Great!</h2>
          <p>Thank you for your reply, <strong>${email}</strong>.</p>
          <div style="background: #fff0f3; padding: 15px; border-radius: 8px; margin-top: 10px; display: inline-block; text-align: left;">
            <strong>Your Message:</strong><br/>
            "${reply}"
          </div>
          <p style="font-size: 11px; color: #999; margin-top: 20px;">
            This was sent automatically by your Love App.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Data saved and email sent to user!",
      data: newReply 
    });

  } catch (error) {
    // If DB fails or email fails, this will return the specific error
    console.log("ERROR 404 ")
    return handleError(error);
  }
};