import jwt from "jsonwebtoken";
const secret = "secret";
export const generateToken = async (userName) => {
  try {
    const token = await jwt.sign({userName,test: true}, secret,{expiresIn: '1hr'});//expiresIn can't be set when payload is simple like string
    // console.log(token,' is token')
    return token;
  } catch (e) {
    console.log(e);
  }
};
