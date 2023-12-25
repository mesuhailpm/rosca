import connectToDb from "@utils/connectToDb";
import Participant from "@models/Participant";
import { NextRequest } from "next/server";
export const POST = async (req: NextRequest, { params }:{params:{id: string}}) => {
  try {
    const body = await req.json();
    console.log(body, " is body in backed post request");
    await connectToDb();
    const updatedParticipant = await Participant.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    console.log(updatedParticipant);
    return new Response(
      JSON.stringify({
        result: updatedParticipant,
        message: "Successfully updated the details",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
        JSON.stringify({
        message: "Failure updating the details"
      }),{status: 400})
  }
};
