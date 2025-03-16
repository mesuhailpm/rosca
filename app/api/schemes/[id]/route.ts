import ROSCA from "@models/Rosca";
import Admin from "@models/Admin";
import { CustomeRequest} from "@types";
import connectToDb from "@utils/connectToDb";

export const revalidate = '60';


export const GET = async (req: CustomeRequest,{ params: { id: schemeId } }:{ params:{ id: string}} ) => {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header

    try {
    await connectToDb()
    if (!await Admin.findById(adminId)) throw Error('You don\'t have permission for this action')
        const scheme = await ROSCA.findById(schemeId).populate('participants')
        console.log('Scheme', scheme);
        return new Response(JSON.stringify({scheme, success: true}), { status: 200 });
    } catch (error: any) {
        console.log('Migration failed');
        console.error(error);
        return new Response(JSON.stringify({ message: error.message, success: false }), { status: 500 });
    } 
}