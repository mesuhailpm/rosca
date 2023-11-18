import connectToDB from "@utils/connectToDb";
import generateOTP from "@utils/generateOTP";
import sendEmail from "@utils/sendEmail";
import OTP from "@models/OTP";
import Admin from "@models/Admin";
import bcrypt from "bcrypt";
const durationInMinutes = 10;

export const POST = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    const { userName, password } = body;
    console.log(userName, password);
    console.log(" this is from api route");
    // return if the user aleady exists
    const alreadyRegistered = await Admin.findOne({ email: userName });
    if (alreadyRegistered) {
      return new Response(
        JSON.stringify({ message: "Admin is already registered" }),
        { status: 400 }
      );
    }
    const newOTPGenerated = await generateOTP();
    console.log(newOTPGenerated, ' is correct OTP')
    
    const hashedOTP = await bcrypt.hash(newOTPGenerated.toString(), 10);
    console.log(hashedOTP, " is hashedOTP");
    const newOTPDoc = new OTP({
      email: userName,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + durationInMinutes * 60 * 1000,
    });
    await newOTPDoc.save();
    await sendEmail({...newOTPDoc, otp: newOTPGenerated});
    return new Response(
      JSON.stringify({ message: `OTP sent over ${userName}` }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error, " is the error in register api route");
  }
};
