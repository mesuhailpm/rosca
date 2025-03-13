import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { TOKEN_SECRET } = process.env
    const token = await req.json()
    if (!TOKEN_SECRET) {
      return new Response(JSON.stringify({ decoded: false, message: 'No Secret Provided For Token!' }), { status: 200 })
    }
    const decoded = await jwt.verify(token, TOKEN_SECRET)
    if (decoded) { return new Response(JSON.stringify(decoded), { status: 200 }) }

  } catch (e:any) {
    console.log(e);
    return new Response(JSON.stringify({message: e.message}),{status:401})
  }
}
