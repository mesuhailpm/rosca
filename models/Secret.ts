import { Document, Model, model, models, Schema } from 'mongoose';

interface SecretDocument extends Document { secret: string}
const secretSchema:Schema<SecretDocument> = new Schema({
    secret: {
        required: true,
        type: String,
    }}
,{timestamps: true})

const Secret:Model<SecretDocument> = models.Secret || model('Secret', secretSchema);
export default Secret;
