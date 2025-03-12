import Admin from "@models/Admin"
import connectToDb from "@utils/connectToDb"
//forcing the caching to be disabled
export const revalidate = 60 // revalidate every 60 seconds
// export const dynamic = 'force-dynamic';


export const GET = async (req: Request) => {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header
    try {

        if(!adminId || adminId !== process.env.MASTER_ADMIN_ID){

            throw Error('Only Owner Can Request This Data')

        }

        await connectToDb()

        const admins = await Admin.find({}).select('-password')
        return new Response(JSON.stringify({admins}))
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error}), {status: 404})

        
    }
}

