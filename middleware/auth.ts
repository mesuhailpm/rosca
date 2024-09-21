import jwt from "jsonwebtoken";
const secret = "secret";
const {TOKEN_SECRET} = process.env
export const generateToken = async (userName: string) => {
  try {
    if (!TOKEN_SECRET) throw Error ('No Token Secret Provided')
    const token = await jwt.sign({userName,test: true}, secret,{expiresIn: '1hr'});//expiresIn can't be set when payload is simple like string
    // console.log(token,' is token')
    return token;
  } catch (e:any) {
    console.log(e);
    throw(e.message || e)
  }
};