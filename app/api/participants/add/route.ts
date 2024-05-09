import connectToDb from "@utils/connectToDb";
import Participant from "@models/Participant";
import { NextRequest } from "next/server";
export const POST = async (req:NextRequest) => {
  const body = await req.json();
  console.log(body);
  const editedForm = {
    name: body.name,
    serial: body.serial,
    claimed: body.claimed,
  };
  try {
    await connectToDb();
    const newParticipant = await Participant.create(editedForm);
    console.log(newParticipant, " is new particpant created"); //
    return new Response(
      JSON.stringify({
        result: newParticipant,
        message: "Member created successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failure adding the member",
      }),
      { status: 400 }
    );
  }
};
