import { model,models, Schema } from 'mongoose';
import { OTPModelType } from '@types';

const OTPSchema = new Schema<OTPModelType>({
    email:{
        type: 'string',
        unique: true,
        required: true
    },
    otp:{
        type: 'string',
        required: true,
    },
    // save the new password to create admin later after verification
    password:{
        type: 'string',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires:60*60
    },
    expiresAt: {
        type: Number,
    }
})

const OTP = models.OTP || model<OTPModelType>('OTP', OTPSchema)
export default OTP

//added automatic deleteion of documents after 1 hour
