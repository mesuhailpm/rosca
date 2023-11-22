import connectToDB from "@utils/connectToDb";
import sendEmail from "@utils/sendEmail";
import OTP from "@models/OTP";
import Admin from "@models/Admin";
import bcrypt from "bcrypt";
const durationInMinutes = 10;

export const POST = async (req,{params}) => {
    const email = params.email
    console.log(email, ' is the admin\'s email')
  try {
    await connectToDB();
    
    // return if the user aleady exists
    const alreadyRegistered = await Admin.findOne({ email });
    if (alreadyRegistered) {
      return new Response(
        JSON.stringify({ message: "Sorry you are already registered" }),
        { status: 400 }
      );
    }
    const existingOTPDoc = await OTP.find({ email });
    const password = existingOTPDoc.password;
    const newAdminToBeSaved = await Admin.create({email, password});
    return new Response(JSON.stringify({newAdminToBeSaved, message:'Congrats! Now you are an admin'}) ,{status: 200})


  } catch (error) {
    console.log(error, " is the error in register api route");
    return new Response(JSON.stringify({ message:'failed to register you as an admin ',error}) ,{status: 501})

  }
};
