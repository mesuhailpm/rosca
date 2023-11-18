import { model,models, Schema } from 'mongoose';

const OTPSchema = new Schema({ 
    email:{
        type: 'string',
        required: true,
        required: true
    },
    otp:{
        type: 'string',
        required: true,
    },
    createdAt:{
        type: Schema.Types.Date,
        default: Date.now()
    },
    expiresAt: {
        type: Number,
    }
})

const OTP = models.OTP || model('OTP', OTPSchema)
export default OTP