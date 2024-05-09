import connectToDB from "@utils/connectToDb";
import sendEmail from "@utils/sendEmail";
import OTP from "@models/OTP";
import Admin from "@models/Admin";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
const durationInMinutes = 10;



export const POST = async (req:NextRequest) => {
  const {password} = await req.json()
  const email = cookies().get('pendingEmail')?.value

  console.log(email, " is the admin's email this is from update admin");

  // try {

  // } catch (error) {

  // }
  // return;

  try {
    await connectToDB();

    // return if the user aleady exists
    console.log('checking if admin exists')
    const alreadyRegistered = await Admin.findOne({ userName: email });
    if (!alreadyRegistered) {
      return new Response(
        JSON.stringify({ message: "Sorry the admin is not found", success:false }),

      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedAdmin = await Admin.updateOne({ userName:email},{password: hashedPassword});console.log('I will be returning a response')

    return new Response(
      JSON.stringify({
        updatedAdmin,
        message: "Congrats! Your password has been updated",
        success:true,
      }),
      { status: 200 }
    );

  } catch (error: any) {
    console.log(error.message, " is the error in register api route");
    return new Response(
      JSON.stringify({ message: "failed to change password ",success: false, error }),
      { status: 501 }
    );
  }
};
