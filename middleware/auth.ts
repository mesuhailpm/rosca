import jwt from "jsonwebtoken";
const secret = "secret";
const {TOKEN_SECRET, MASTER_EMAIL} = process.env
export const generateToken = async ({ adminId, userName}:{adminId: string, userName: string}) => {
  try {
    if (!TOKEN_SECRET) throw Error ('No Token Secret Provided')
    const token = await jwt.sign({adminId, userName, superAdmin: userName === MASTER_EMAIL}, secret,{expiresIn: '1hr'});//expiresIn can't be set when payload is simple like string
    // console.log(token,' is token')
    return token;
  } catch (e:any) {
    console.log(e);
    throw(e.message || e)
  }
};