import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  console.log('inside the verify api route')
  try {
    const { TOKEN_SECRET } = process.env
    console.log(TOKEN_SECRET, 'is atooken secret insid ethe verifyTOken')
    const token = await req.json()
    console.log(token , ' is token received inside veruify token')
    if (!TOKEN_SECRET) {
      return new Response(JSON.stringify({ decoded: false, message: 'No Secret Provided For Token!' }), { status: 200 })
    }
    const decoded = await jwt.verify(token, TOKEN_SECRET)
    console.log(decoded, ' is decoded inside the verify')
    if (decoded) { return new Response(JSON.stringify(decoded), { status: 200 }) }

  } catch (e:any) {
    console.log(e);
    return new Response(JSON.stringify({message: e.message}),{status:401})
  }
}
