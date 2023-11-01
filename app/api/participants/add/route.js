import connectToDb from "@utils/connectToDb";
import Participant from "@models/Participant";
export const POST = async (req) => {
  const body = await req.json();
  console.log(body)
  const editedForm = {name: body.name, serial: body.serial, claimed:body.claimed}
  try {
    await connectToDb();
    const result = await Participant.create(editedForm);
    console.log(result); //
    return new Response(
      JSON.stringify(
        { result, message: "Member created successfully" },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log(error);
  }
};
