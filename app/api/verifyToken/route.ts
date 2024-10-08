import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';
const { TOKEN_SECRET } = process.env
export const POST = async (req: NextRequest) => {
  const token = await req.json()
  console.log(TOKEN_SECRET, 'is token')
  console.log(token, 'is token')
  try {

    if (!TOKEN_SECRET) {
      return new Response(JSON.stringify({ decoded: false, message: 'No Secret Provided For Token!' }), { status: 200 })
    }
    // console.log(body, ' is jsonwebtoken body')
    // console.log(token, 'is token to verify');
    const decoded = await jwt.verify(token, TOKEN_SECRET)
    console.log(decoded, ' i sdecoded');
    if (decoded) { return new Response(JSON.stringify(decoded), { status: 200 }) }

  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify(e))

  }
}
