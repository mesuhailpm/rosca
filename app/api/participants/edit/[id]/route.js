import connectToDb from '@utils/connectToDb'
import Participant from '@models/Participant';
export const POST = async (req,{params}) => {
    try {
        const body = await req.json()
        console.log(body,' is body in backed post request')
        await connectToDb()
        await Participant.find
        const updatedParticipant = await Participant.findByIdAndUpdate(params.id, body,{new: true})
        console.log(updatedParticipant);
        return new Response(JSON.stringify({result:updatedParticipant, message:'Successfully updated the details'}),{status: 200})

    } catch (error) {
        // console.log(error);
    }
}