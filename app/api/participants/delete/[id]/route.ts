import Participant from "@models/Participant";
import Rosca from "@models/Rosca";
import connectToDb from "@utils/connectToDb";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params }:{params:{id:string}}) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await connectToDb();
    console.log(params.id, "got in backend");
    const deletedParticipant = await Participant.findByIdAndRemove(params.id,{session});
    if (!deletedParticipant) {
      throw new Error('Participant not found');
    }

    const associtatedRosca = await Rosca.findOne( {participants: { $in: deletedParticipant?._id}} )
    if (!associtatedRosca)throw Error(' Unable to deleted the member! Reason: No associated ROSCA ID found!')

    await Rosca.findByIdAndUpdate(associtatedRosca._id, {$pull: { participants: deletedParticipant?._id}})
    await session.commitTransaction()
    await session.endSession()
    return new Response(
      JSON.stringify({ result: deletedParticipant,message: "Member removed successfully" })
    );
  } catch (error) {
    console.error(error);
    await session.abortTransaction()
    await session.endSession()
    
    return new Response(
      JSON.stringify({
        message: "Failure deleting the details",
      }),
      { status: 400 }
    );
  }
};
