import jwt from 'jsonwebtoken'
export const POST = async(req) => {
    const token = await req.json()
    try {
        // console.log(body, ' is jsonwebtoken body')
      console.log(token, 'is token to verify');
      const decoded = await jwt.verify(token, 'secret')
      // console.log(decoded, ' i sdecoded');
      if (decoded) return new Response(JSON.stringify(decoded),{status: 200})
    } catch (e) {
      console.log(e);
      return new Response(JSON.stringify(e),{status:401})

    }
  }
  