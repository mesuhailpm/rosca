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

export type Participant = {
    _id: string | ''
    name: string,
    serial: number,
    claimed: boolean
}
export type Participants = Participant[]

export type ConfirmationMessage = {
    message: string;
    success: boolean;
}

export interface State {
    isLoggedIn: boolean;
    participants: Participants; // Define Participant type here
    responseLoading: boolean;
    confirmationMessage: ConfirmationMessage;
    showDeleteModal: boolean;
}
