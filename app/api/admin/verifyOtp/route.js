import Admin from "@models/Admin";
import OTP from "@models/OTP";
import connectToDb from "@utils/connectToDb";
import brcypt from "bcrypt";

export const POST = async (req) => {
  console.log("first");
  const { otp, admin: email } = await req.json();

  try {
    console.log(email, ' is email');
    await connectToDb;
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      throw new Error("admin already");
    }
    const { otp: OTPInRecord } = await OTP.findOne({ email });
    console.log(OTPInRecord, " is recoreded OTP in hashed format");
    const ismatching = await brcypt.compare(otp, OTPInRecord);
    console.log("value of ismathcing is", ismatching);
    if (ismatching) {
      if (OTPInRecord.expiresAt < Date.now()) {
        return new Response(JSON.stringify(

            { message: "OTP has expired, Please try again", success: false },
            { status: 402 }
            )
        );
      } else {
        return new Response(
            JSON.stringify(
                { message: "Email is successfully verified", success: true },
                { status: "200" }
                )
        );
      }
    } else {
        console.log(ismatching, ' is false hence returining otp incorrect response')
      return new Response(
        JSON.stringify({ message: "The OTP is incorrect",success: false }),
        { status: "502" }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(

        { message: "Something went wrong", success: false },
        { status: "502" }
        )
      );
  }
};
