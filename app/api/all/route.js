import connectToDb from '@utils/connectToDb'
import Participant from '@models/Participant'
export const GET = async () => {
    try {
        await connectToDb()
        const allParticipants = await Participant.find()
        console.log(allParticipants)
        return new Response(allParticipants,{success: true, status: 200})
        
    } catch (error) {
        return new Response(error, {success: false, status:405})

    }

}
