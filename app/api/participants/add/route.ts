import connectToDb from "@utils/connectToDb";
import Participant from "@models/Participant";
import { NextRequest } from "next/server";
import { ParticipantFormData } from "@types";
import mongoose from "mongoose";
import Rosca from "@models/Rosca";
import Admin from "@models/Admin";
export const POST = async (req:NextRequest) => {
  const body = await req.json();
    const editedForm: ParticipantFormData = {
    name: body.name,
    serial: body.serial,
    claimed: body.claimed,
    roscaId: body.roscaId,
       
  };
  const mongooseSession = await mongoose.startSession()
  await mongooseSession.startTransaction()

  try {
    const adminId = req.headers.get('x-admin-id'); // Get the admin information from the custom header
    if(!adminId || !(await Admin.findById(adminId))) throw new Error('Unauthorized Operation!')


    await connectToDb();
    const participant = new Participant(editedForm);
    const newParticipant = await participant.save({session: mongooseSession})
    console.log(newParticipant, " is new participant created"); //
    await Rosca.findByIdAndUpdate(editedForm.roscaId, { $push: { participants: newParticipant._id } } ,{ session: mongooseSession})
    await mongooseSession.commitTransaction()
    await mongooseSession.endSession()
    return new Response(
      JSON.stringify({
        result: newParticipant,
        message: "Member created successfully",
        success: true
      }),
      { status: 200 }
    );
  } catch (error: any) {
    mongooseSession.abortTransaction()
    mongooseSession.endSession()
    console.log(error)
    return new Response(
      JSON.stringify({
        message: error.message || "Failure adding the member",
        success: false
      }),
      { status: 400 }
    );
  }
};
