import { } from '@types';
import { model, models, Schema } from 'mongoose';
const secretSchema = new Schema({
    secret: {
        required: true,
        type: String,
    }}
,{timestamps: true})

const Secret = models.Secret || model('Secret', secretSchema);
export default Secret;
