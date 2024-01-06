import connectToDB from "@utils/connectToDb";
import generateOTP from "@utils/generateOTP";
import sendEmail from "@utils/sendEmail";
import OTP from "@models/OTP";
import Admin from "@models/Admin";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
const durationInMinutes = 10;
const { NEXT_PUBLIC_REGISTRATION_ALLOWED } = process.env;

export const POST = async (req: NextRequest) => {
  if (NEXT_PUBLIC_REGISTRATION_ALLOWED === 'false') {
    console.log('NEXT_PUBLIC_REGISTRATION_ALLOWED is \'false\' please update it.')
    return new Response(
      JSON.stringify({ message: "Register is diabled. Please contact the owner" }),
      { status: 501 }
    );
  }
  try {
    await connectToDB();
    const formData = await req.json();
    const { email } = formData;
    console.log(email);
    console.log(" this is from api route inside forgot");
    // return if the user aleady exists
    const alreadyRegistered = await Admin.findOne({ userName: email });
    if (!alreadyRegistered) {
      console.log('no admin to verify');
      return new Response(
        JSON.stringify({ message: "Admin is not registered" }),
        { status: 400 }
      );
    }
    const existingOTP = await OTP.find({ email })
    console.log(existingOTP);
    if (existingOTP) await OTP.findOneAndRemove({ email })
    const newOTPGenerated = generateOTP();
    console.log(newOTPGenerated, ' is correct OTP')
    const hashedOTP = await bcrypt.hash(newOTPGenerated.toString(), 10);
    console.log(hashedOTP, " is hashedOTP");

    const newOTPDoc = new OTP({
      email,
      otp: hashedOTP,
      password: 'passwordnotapplicable',
      createdAt: Date.now(),
      expiresAt: Date.now() + durationInMinutes * 60 * 1000,
    });
    await newOTPDoc.save();
    await sendEmail({ email, otp: newOTPGenerated });
    console.log('sending fincal response');
    return new Response(
      JSON.stringify({ message: `OTP sent over ${email}`, success: true }),
      //sending the email in coookie
      { status: 200, headers: { "Set-Cookie": `pendingEmail=${email}; Http-Only; Max-Age:3600` } }
    );
  } catch (error) {
    console.log(error, " is the error in register api route");
    return new Response(
      JSON.stringify({ message: `something went wrong`, }),
      { status: 403 }
    )
  }
};
