import Secret from "@models/Secret"
import connectToDb from "@utils/connectToDb"
import jwt from 'jsonwebtoken'




export const DELETE = async (req: Request) => {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header
    
    try {
        if(!adminId || adminId !== process.env.MASTER_ADMIN_ID){
        
            throw Error('Only Owner Can Request This Action')
        
        }
        const id = await req.json()
        const deletedDocument = await Secret.findByIdAndDelete(id)
        if (!deletedDocument) throw new Error('Failed to delete');

        return new Response(JSON.stringify({ message: 'Successfully deleted' }), { status: 200 });
    } catch (error: any) {
        console.log(error, ' in deleting');

        // Handle specific errors
        if (error?.name === 'CastError') {
            return new Response(JSON.stringify({ error: error.message, message: 'Invalid secret ID provided' }), { status: 400 });
        }
        
        // Handle unauthorized or forbidden
        if (error?.message === 'Only Owner Can Request This Action') {
            return new Response(JSON.stringify({ message: error.message }), { status: 403 });
        }

        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export const POST = async function (req: Request) {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header

    try {
        if(!adminId || adminId !== process.env.MASTER_ADMIN_ID){
            
            throw Error('Only Owner Can Request This Action')
        
        }

        const { secret, token } = await req.json();
        if (token) {
            const decoded : any = jwt.verify(token, process.env.TOKEN_SECRET as string)
            if (decoded && decoded.userName===process.env.MASTER_EMAIL) {

                await connectToDb()
                const secrets = await Secret.find({})

                return new Response(JSON.stringify({ secrets, success: true, message:`Fetched ${secrets.length} Secret(s)` }), { status: 200 })

            }
        } 
        const secretDocument = new Secret({ secret })
        const newSecretDocument = await secretDocument.save();
        return new Response(JSON.stringify({ message: `You can now share new secret: "${secret}"`, result: newSecretDocument, success: true }), { status: 200 })
    } catch (error: any) {

        if (error?.message === 'Only Owner Can Request This Action') {
            return new Response(JSON.stringify({ message: error.message }), { status: 403 });
        }
        return new Response(JSON.stringify({message: error.message, succces: false}), { status: 500 })

    }
}