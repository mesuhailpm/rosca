import connectToDB from "@utils/connectToDb";
import generateOTP from "@utils/generateOTP";
import sendEmail from "@utils/sendEmail";
import OTP from "@models/OTP";
import Admin from "@models/Admin";
import Secret from "@models/Secret";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
const durationInMinutes = 10;
const { NEXT_PUBLIC_REGISTRATION_ALLOWED } = process.env;

export const POST = async (req: NextRequest) => {
  if (NEXT_PUBLIC_REGISTRATION_ALLOWED === 'false') {
    console.log('NEXT_PUBLIC_REGISTRATION_ALLOWED is \'false\' please update it.')
    return new Response(
      JSON.stringify({ message: "Register is diabled. Please contact the owner", success: false }),
      { status: 501 }
    );
  }
  try {

    await connectToDB();
    const formData = await req.json();
    const { email, password, secret } = formData;

    console.log({ email, password, secret });
    const dbSecret = await Secret.findOne({ secret: secret })
    if (!dbSecret) {
      return new Response(JSON.stringify({ message: "Invalid Secret, Please Obtain a secret from admin", success: false })
      )
    }

    console.log(" this is from api route");
    // return if the user aleady exists
    const alreadyRegistered = await Admin.findOne({ userName:email });
    console.log(alreadyRegistered, ' is already registered email address');

    if (alreadyRegistered) {
      return new Response(
        JSON.stringify({ message: "Admin is already registered", success: false }),
        { status: 400 }
      );
    }
    const existingOTP = await OTP.find({ email })
    if (existingOTP) await OTP.findOneAndRemove({ email })
    const newOTPGenerated = generateOTP();
    console.log(newOTPGenerated, ' is correct OTP')
    const hashedPassword = await bcrypt.hash(password, 10)
    const hashedOTP = await bcrypt.hash(newOTPGenerated.toString(), 10);
    console.log(hashedOTP, " is hashedOTP");
    const newOTPDoc = new OTP({
      email,
      otp: hashedOTP,
      password: hashedPassword,
      createdAt: Date.now(),
      expiresAt: Date.now() + durationInMinutes * 60 * 1000,
    });
    await newOTPDoc.save();
    await sendEmail({ email, otp: newOTPGenerated });
    return new Response(
      JSON.stringify({ message: `OTP sent over ${email}`, success: true }),
      { status: 200, headers: { "Set-Cookie": `pendingEmail=${email}; Http-Only; Max-Age:3600` } }
    );
  } catch (error) {
    console.log(error, " is the error in register api route");
    return new Response(JSON.stringify({ message: 'Something went wrong', success: false, error }), { status: 404 })
  }
};
