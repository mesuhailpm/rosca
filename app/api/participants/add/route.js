import connectToDb from "@utils/connectToDb";
import Participant from "@models/Participant";
export const POST = async (req) => {
  const body = await req.json();
  try {
    await connectToDb();
    const result = await Participant.create(body);
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
