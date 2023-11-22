import { model,models, Schema } from 'mongoose';

const OTPSchema = new Schema({ 
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
        type: Number,
        default: Date.now()
    },
    expiresAt: {
        type: Number,
    }
})

const OTP = models.OTP || model('OTP', OTPSchema)
export default OTP