import mongoose,{ConnectOptions} from "mongoose"
const mongodbUri = process.env.NEXT_MONGODB_URI

let isConnected : boolean;
export default async () => {
     if (isConnected === true) {
        console.log('mongodb is already connected');

        return
     }
    
    try {
        await mongoose.connect(mongodbUri as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        isConnected = true;
        console.log('connected to database')
    }
    catch (error) {
        console.log('Failed to connected to db ', error)

    }

}
