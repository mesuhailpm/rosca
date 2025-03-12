import { NextRequest } from "@node_modules/next/server";

const handler = (req: NextRequest)=>{
    return new Response(JSON.stringify({message: "Unauthorized operation detected", success: false}),{status:401})
}


export { handler as GET, handler as POST, handler as DELETE, handler as PUT };