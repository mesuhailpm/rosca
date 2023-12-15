export type ParticpantModelType = {
    name: String,
    serial: Number,
    claimed: Boolean
}
export type Action = 'edit' | 'remove' | 'add'

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
export type FormData = {
    name: string, _id: string, serial: number, claimed: boolean
}

export interface State {
    isLoggedIn: boolean;
    participants: Participants; // Define Participant type here
    setParticipants: (participants: Participants) => void;
    responseLoading: boolean;
    showConfirmation: boolean;
    confirmationMessage: ConfirmationMessage;
    showDeleteModal: boolean;
    toggleShowDeleteModal:()=>void;
    showFormModal: boolean;
    setShowFormModal: (flag: boolean)=> void;
    toggleShowFormModal: ( action?:Action)=>void;
    formData:FormData;
    setFormData: (form: FormData) => void;
    handleSubmit: Function;
    action:Action;
    _id: string;
    idTodelete:string;
}
