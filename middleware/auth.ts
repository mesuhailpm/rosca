import jwt from "jsonwebtoken";
const secret = "secret";
export const generateToken = async (userName: string) => {
  try {
    let token;
    if (userName === 'tosuhailpm@gmail.com') {
      token = await jwt.sign({ userName, superAdmin: true }, secret, { expiresIn: '1hr' })}
      else{
      token = await jwt.sign({ userName, superAdmin: false }, secret, { expiresIn: '1hr' }); //expiresIn can't be set when payload is simple like string hence
    }
    console.log(token,' is token')
    return token;
  } catch (e) {
    console.log(e);
  }
};
