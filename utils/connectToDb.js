import mongoose from "mongoose"
const mongodbUri = 'mongodb+srv://rocsa:rocsa@cluster0.2gygs7q.mongodb.net/ROSCA?retryWrites=true&w=majority'
// const mongodbUri = 'mongodb+srv://promptpedia:promptpedia@cluster0.2gygs7q.mongodb.net/?retryWrites=true&w=majority'

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
