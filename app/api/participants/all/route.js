import connectToDb from '@utils/connectToDb'
import Participant from '@models/Participant'
export const GET = async () => {
    try {
        await connectToDb()
        const allParticipants = await Participant.find()
        // console.log(allParticipants, ' inside GET')
        return new Response(JSON.stringify({allParticipants,success: true, status: 200}))
        
    } catch (error) {
        console.log(error, ' error in route GET');
        return new Response(JSON.stringify({error}), {success: false, status:405})

    }

}
