export type ParticpantModelType = {
    name: String,
    serial: Number,
    claimed: Boolean
}

export type AdminModelType = {
    userName: String,
    password: String
}
export type OTPModelType = {
    email: String,
    otp: Number,
    password: String,
    createdAt?: Number,
    expiresAt?: Number
}