import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
});

export const sendVerificationEmail = async(email, otp) =>{
    try {
    await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Email Verification",
      text: `Your OTP is ${otp}`
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}