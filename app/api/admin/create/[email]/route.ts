import connectToDB from "@utils/connectToDb";
import sendEmail from "@utils/sendEmail";
import OTP from "@models/OTP";
import Admin from "@models/Admin";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
const durationInMinutes = 10;

export const GET = async (req: NextRequest, { params }:{params:{email:string}}) => {
  const email = params.email;
  console.log(email, " is the admin's email this is from create admin");

  // try {
    
  // } catch (error) {
    
  // }
  // return;

  try {
    await connectToDB();

    // return if the user aleady exists
    console.log('checking if admin exists')
    const alreadyRegistered = await Admin.findOne({ userName: email });
    if (alreadyRegistered) {
      return new Response(
        JSON.stringify({ message: "Sorry you are already registered", success:false }),

      );
    }
    console.log('geting OTP record for admin')
    const existingOTPDoc = await OTP.findOne({ email });
    console.log(existingOTPDoc,'is existing OTP record for admin')
    const password = await existingOTPDoc.password;
    console.log('saving the OTP record for admin')
    const newAdminToBeSaved = await Admin.create({ userName:email, password});console.log('I will be returning a response')

    return new Response(
      JSON.stringify({
        newAdminToBeSaved,
        message: "Congrats! Now you are an admin. Please login",
        success:true,
      }),
      { status: 200 }
    );

  } catch (error: any) {
    console.log(error.message, " is the error in register api route");
    return new Response(
      JSON.stringify({ message: "failed to register you as an admin ",success: false, error }),
      { status: 501 }
    );
  }
};
