import { model, models, Schema } from 'mongoose'

const participantSchema = new Schema({
    name:{
        type: String,
        required: true,
    }
})

const Participant = models.Participant || model('Participant', participantSchema)
export default Participant