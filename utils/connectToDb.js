import mongoose from "mongoose"
const mongodbUri = process.env.NEXT_PUBLIC_MONGODB_URI

let isConnected;
export default async () => {
     if (isConnected === true) {
        console.log('mongodb is already connected');

        return
     }
    
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('connected to database')
    }
    catch (error) {
        console.log('Failed to connected to db ', error)

    }

}
