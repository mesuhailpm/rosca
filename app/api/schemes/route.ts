import ROCSA from "@models/Rosca";
import Admin from "@models/Admin";
import Participant from "@models/Participant";
import mongoose, { Types } from "mongoose";
import { CustomeRequest, ParticipantFormData, RoscaType } from "@types";
import { Console } from "console";
import connectToDb from "@utils/connectToDb";

export const GET = async (req: CustomeRequest) => {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header

    try {
        await connectToDb()    
        let schemes = await ROCSA.find({ admins: { $in: [adminId] } }).select('-admins');

        return new Response(JSON.stringify(schemes), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: error }), { status: 500 });
    }
}

export const POST = async (req: CustomeRequest) =>{
    
    try {
        const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header
        if(!adminId || !(await Admin.findById(adminId))) throw new Error('Unauthorized Operation!')
    
        const { name, participants }:{ name: string, participants: Omit<ParticipantFormData, 'roscaId'> [] }= await req.json(); console.log(name, participants)
        if(!name) throw Error( 'No Name Provided!')
        if( participants.some((el) => !el.name)) throw Error ('Name is mandatory for each participant')
        if (!name) {
            throw new Error('Scheme name is required');
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        let result

        try {

            const participantsData = participants.map((p: Omit<ParticipantFormData, 'roscaId'>) => new Participant(p,{session}));
            console.log(participantsData, ' is partcipinatn data')
            const newScheme = new ROCSA({ name }, { session });
            console.log(newScheme, ' is new scheme')

            const participantsIDs = participantsData.map(p => p._id)
            console.log(participantsIDs, ' are IDs')
            newScheme.participants = participantsIDs as unknown as string[]
            console.log(newScheme.participants,' line 45')

            participantsData.forEach(async (party)=> await party.save({session}))
            
            
            await Admin.updateOne(
            { _id: adminId },
            { $addToSet: { roscaIds: newScheme._id } },
            { session }
            );

            newScheme.admins.push(adminId)
            console.log('admin with ',adminId, '  is now updated')
            console.log('going to save the newSCheme', newScheme)

            result = await newScheme.save({session})



            await session.commitTransaction();
            await session.endSession();

        } catch (error) {
            await session.abortTransaction();
            await session.endSession();

            throw error;
        }
        
        return new Response(JSON.stringify({result, message: 'New Scheme Created Successfully', success: true}), { status: 201 });
        
    } catch (error: any) {
        console.log(error)
        return new Response( JSON.stringify({message: error.message}), {status: 400} )
    }
}