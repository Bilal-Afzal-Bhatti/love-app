import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "@gmail", // Or your preferred provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an "App Password" for Gmail
  
  },
   
});
 