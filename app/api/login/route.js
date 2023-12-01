import connectToDb from "@utils/connectToDb";
import Admin from "@models/Admin";
import {generateToken} from "@middleware/auth";
import bcrypt from 'bcrypt'


export const POST = async (req) => {
  const { userName, password } = await req.json();
  try {
    // console.log(userName);
    await connectToDb();
    const registeredAdmin = await Admin.findOne({ userName });
    // console.log(registeredAdmin, "isReistered");
    if (!registeredAdmin)
      return new Response(
        JSON.stringify({
          message: "No admin found with this username",
        }),
        { status: 400 }
      );
    const isCorrectPassword = await bcrypt.compare(password, registeredAdmin.password)
    
    if (!isCorrectPassword)
      return new Response(
        JSON.stringify({
          message: "Password is incorrect",
        }),
        { status: 401 }
      );
    //send a token and username
    const token = await generateToken(registeredAdmin.userName)
    
    return new Response(JSON.stringify({ message: "successful", token, userName: registeredAdmin.userName }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
