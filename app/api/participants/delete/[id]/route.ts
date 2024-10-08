import Participant from "@models/Participant";
import connectToDb from "@utils/connectToDb";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params }:{params:{id:string}}) => {
  try {
    await connectToDb();
    console.log(params.id, "got in backend");
    const deletedParticipant = await Participant.findByIdAndRemove(params.id);
    console.log(deletedParticipant);
    return new Response(
      JSON.stringify({ result: deletedParticipant,message: "Member removed successfully" })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failure deleting the details",
      }),
      { status: 400 }
    );
  }
};
