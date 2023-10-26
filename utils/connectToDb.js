import mongoose from "mongoose"
// const mongodbUri = 'mongodb+srv://mernAppUser:mernAppUser@cluster0.2gygs7q.mongodb.net/?retryWrites=true&w=majority'
const mongodbUri = 'mongodb+srv://promptpedia:promptpedia@cluster0.2gygs7q.mongodb.net/?retryWrites=true&w=majority'
export default async () => {
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to database')
    }
    catch (error) {
        console.log('Failed to connected to db ', error)

    }

}
