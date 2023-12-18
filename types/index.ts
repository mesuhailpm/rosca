import { FormEvent } from "react"

export type ParticpantModelType = {
    name: String,
    serial: Number,
    claimed: Boolean
}
export type Action = 'edit' | 'remove' | 'add' | ''

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
export type HandleSubmit = (e:FormEvent<HTMLFormElement>,action:Action,_id: string, formData:FormData)=>void;


export interface State {
    isLoggedIn: boolean;
    participants: Participants; // Define Participant type here
    setParticipants: (participants: Participants) => void;
    responseLoading: boolean;
    startResponseLoading: ()=>void;
    endResponseLoading: ()=>void;
    showConfirmation: boolean;
    confirmationMessage: ConfirmationMessage;
    runConfirmation:(messageObject:ConfirmationMessage)=>void;
    showDeleteModal: boolean;
    toggleShowDeleteModal:()=>void;
    showFormModal: boolean;
    setShowFormModal: (flag: boolean)=> void;
    toggleShowFormModal: ( action?:Action)=>void;
    formData:FormData;
    setFormData: (form: FormData) => void;
    action:Action;
    _id: string;
    idTodelete:string;
}
