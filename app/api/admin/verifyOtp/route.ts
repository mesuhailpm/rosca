import Admin from "@models/Admin";
import OTP from "@models/OTP";

import { NextRequest } from "next/server";
import connectToDb from "@utils/connectToDb";
import brcypt from "bcrypt";
import { cookies } from 'next/headers'


type OTPDocument = {
  otp:string,
  expiresAt: number,
  password: string,
  createdAt:string,
  _id: string,
  email:string

}

export const POST = async (req: NextRequest) => {
  console.log("Inside verifyOTp roure");
  const { otp }:{otp:number, admin:string} = await req.json();
  const email = cookies().get('pendingEmail')?.value
  try {
    console.log(email, ' is email to verify otp with');
    await connectToDb();
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      throw new Error("admin already so can't create new admin");
    }
    const OTPObjectinRecord:OTPDocument = await OTP.findOne({ email }).exec();

    console.log( OTPObjectinRecord)
    if (!OTPObjectinRecord){
      return new Response(JSON.stringify({message: 'Request an OTP first'}),{status:404})
    }

      const {otp: OTPInRecord, expiresAt } = OTPObjectinRecord




    console.log(OTPInRecord, " is recoreded OTP in hashed format");
    const ismatching = await brcypt.compare(otp.toString(), OTPInRecord);
    console.log("value of ismathcing is", ismatching);
    if (ismatching) {
      if (expiresAt < Date.now()) {
        return new Response(JSON.stringify(

            { message: "OTP has expired, Please start over", success: false },
            ),
            { status: 402 }
        );
      } else {
        return new Response(
            JSON.stringify(
                { message: "Email is successfully verified", success: true },
                ),
                { status: 200}
        );
      }
    } else {
        console.log(ismatching, ' is false hence returining otp incorrect response')
      return new Response(
        JSON.stringify({ message: "The OTP is incorrect",success: false }),
        { status: 502 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(

        { message: "Something went wrong", success: false },
        ),
        { status: 502 }
      );
  }
};
