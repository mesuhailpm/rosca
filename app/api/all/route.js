import connectToDb from '@utils/connectToDb'
export const GET = async () => {
    try {
        await connectToDb()
        console.log('trying');
    } catch (error) {

        console.log(error)
    }

}
