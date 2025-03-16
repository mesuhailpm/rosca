import ROSCA from "@models/Rosca";
import Admin from "@models/Admin";
import Participant from "@models/Participant";
import mongoose from "mongoose";
import { CustomeRequest } from "@types";
import connectToDb from "@utils/connectToDb";

export const GET = async (req: CustomeRequest) => {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header
    
    try {
        if(!adminId || adminId !== process.env.MASTER_ADMIN_ID){
            throw Error('Only Owner Can Request This Data')
        }
        await connectToDb()
        const schemes = await ROSCA.find()
            .populate(
                { path: 'admins',
                    select: '-password'
                })
            .populate('participants')                 
                
                        return new Response(JSON.stringify({schemes, success: true}), { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return new Response(JSON.stringify({ message: error.message, success: false }), { status: 500 });
    }
}

export const DELETE = async (req: CustomeRequest) => {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header

    
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        if(!adminId || adminId !== process.env.MASTER_ADMIN_ID){
    
            throw Error('Only Owner Can Request This Data')
    
        }
        const id = await req.json()
        if (!id) throw Error("Scheme is not provided")
          
        await connectToDb()

        const deleted = await ROSCA.findByIdAndDelete(id, {session})
        if(!deleted){
            throw Error("Rosca not found" );
        }

        await Participant.deleteMany({roscaId: id},{session})
        await Admin.updateMany({roscaIds: {$in: id}}, { $pull : { roscaIds : id}},{session})

        await session.commitTransaction()
        await session.endSession()

        
        return new Response(JSON.stringify({message: 'Scheme deleted completely', success: true}), { status: 200 });
    } catch (error: any) {
        console.error(error);
        await session.abortTransaction()
        await session.endSession()
        return new Response(JSON.stringify({ message: error.message, success: false }), { status: 500 });
    }
}
