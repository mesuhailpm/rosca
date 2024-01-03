import Admin from "@models/Admin";
import OTP from "@models/OTP";
import connectToDb from "@utils/connectToDb";
import brcypt from "bcrypt";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  console.log("Inside verifyOTp roure");
  const { otp, admin: email }: { otp: number, admin: string } = await req.json();

  try {
    console.log(email, ' is email to verify otp with');
    await connectToDb();

    //if the email is not a valid admin username in records
    const adminExists = await Admin.findOne({ userName: email });
    if (!adminExists) {
      throw new Error("Sorry admin does not exist");
    }


    const OTPObjectinRecord = await OTP.findOne({ email });
    if (!OTPObjectinRecord){
      {
        return new Response(JSON.stringify({message: 'Request an OTP first'}),{status:404})
      }
    }
    const { otp: OTPInRecord } = await OTP.findOne({ email });
    console.log(OTPInRecord, " is recoreded OTP in hashed format");
    const ismatching = await brcypt.compare(otp.toString(), OTPInRecord);
    console.log("value of ismathcing is", ismatching);
    if (ismatching) {
      if (OTPObjectinRecord.expiresAt < Date.now()) {
        return new Response(JSON.stringify({ message: "OTP has expired, Please start over", success: false }), { status: 402 })
      } else {
        return new Response(
          JSON.stringify({ message: "Email is successfully verified", success: true }), { status: 200 }
        );
      }
    } else {
      console.log(ismatching, ' is false hence returining otp incorrect response')
      return new Response(JSON.stringify({ message: "The OTP is incorrect", success: false }), { status: 502 })
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong", success: false }), { status: 502 })
  }
};
