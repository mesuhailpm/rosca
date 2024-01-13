import Admin from "@models/Admin";
import connectToDb from "@utils/connectToDb";

export const DELETE = async (req: Request, {params}:{ params:{email:string}}) => {
    try {
        const {email} = params;
        console.log(email)
        await connectToDb()
        const isExisting = await Admin.findOne({userName: email})
        if (!isExisting) throw new Error(`could not find ${email} in admins`)
        const newer = await Admin.deleteOne({userName: email})
        console.log(newer);
        
        return new Response(JSON.stringify({message: 'Admin deleted successfully'}))
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({message:'Unable to find Admin', error: error.message}))
        
    }
    
}