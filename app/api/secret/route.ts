import Secret from "@models/Secret"
import connectToDb from "@utils/connectToDb"

export const GET = async (req: Request) => {
    try {
        await connectToDb()
        const secrets = await Secret.find({})
        return new Response(JSON.stringify({ secrets }), { status: 200 })

    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({ error }), { status: 404 })

    }
}



export const DELETE = async (req: Request) => {
    try {
        const id = await req.json()
        const deletedDocument = await Secret.findByIdAndDelete(id)
        if (!deletedDocument) throw new Error('Failed to delete');

        return new Response(JSON.stringify({ message: 'Successfully deleted' }), { status: 200 });
    } catch (error: any) {
        if (error?.name === 'CastError') {
            return new Response(JSON.stringify({error,message:'Not successful!! Contact the admin, instead'}), { status: 404 })
        }
        console.log(error,' in deleting');

        return new Response(JSON.stringify(error), { status: 404 })
    }
}

export const POST = async (req: Request) => {
    try {

        const secret = await req.json();
        const secretDocument = new Secret({ secret })
        const newSecretDocument = await secretDocument.save();
        return new Response(JSON.stringify({ message: `You can now share new secret: "${secret}"`, result: newSecretDocument }), { status: 200 })
    } catch (error) {
        console.log(error, ' in creating new secret');
        return new Response(JSON.stringify(error), { status: 504 })

    }
}