import Admin from "@models/Admin"
import connectToDb from "@utils/connectToDb"
//forcing the caching to be disabled
export const revalidate = 60 // revalidate every 60 seconds
// export const dynamic = 'force-dynamic';


export const GET = async (req: Request) => {
    try {
        await connectToDb()

        const admins = await Admin.find({}).select('-password')
        return new Response(JSON.stringify({admins}))
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error}), {status: 404})

        
    }
}

