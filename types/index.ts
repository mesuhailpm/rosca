import { FormEvent } from "react"
import { NextRequest } from "next/server"
import { RoscaDoc } from "@models/Rosca"
import { Date } from "mongoose"

export interface ParticipantModelType  {
    name: String,
    serial: Number,
    claimed: Boolean,
    roscaId: String
}

export interface CustomeRequest extends NextRequest{
    admin: string
}

export interface RoscaType {
    name: string,
    admins: string[],
    participants: string[]
}

// Define RoscaType except admins
export type RoscaTypeExceptAdmins = Omit<RoscaDoc, 'admins'>
export type Action = 'edit' | 'remove' | 'add' | ''

export interface AdminModelType  {
    userName: string,
    password: string
    roscaIds: string[]
}
export interface OTPModelType {
    email: String,
    otp: String,
    password: String,
    createdAt?: Date,
    expiresAt?: Date
}

export type Participant = {
    _id: string | ''
    name: string,
    serial: number,
    claimed: boolean
    updatedAt: Date
}
export type Participants = Participant[]

export type ConfirmationMessage = {
    message: string;
    success: boolean;
}
export type ParticipantFormData = {
    name: string, serial: number, claimed: boolean, roscaId: string, _id?: string
}
export type HandleSubmit = (e: FormEvent<HTMLFormElement>, action: Action, _id: string, formData: FormData) => void;


export interface State {
    adminLoading: boolean;
    setAdminLoading: (flag: boolean) => void;
    admin: {userName: string, adminId: string} | null;
    login: (admin: {userName: string, adminId: string}) => void;
    isLoggedIn: boolean;
    participants: Participants; // Define Participant type here
    setParticipants: (participants: Participants) => void;
    participantsLoading: boolean;
    setParticipantsLoading: (flag: boolean) => void;
    responseLoading: boolean;
    loadingCaption: string;
    startResponseLoading: (caption?: string) => void;
    endResponseLoading: () => void;
    showConfirmation: boolean;
    confirmationMessage: ConfirmationMessage;
    runConfirmation: (messageObject: ConfirmationMessage, time?: number) => void;
    deletePopupVisibility: boolean;
    setDeletePopupVisibility: (flag: boolean) => void;
    toggleDeletePopupVisibility: () => void;
    FormVisibility: boolean;
    setFormVisibility: (flag: boolean) => void;
    toggleFormVisibility: (action?: Action) => void;
    participantFormData: ParticipantFormData;
    setParticipantFormData: (form: ParticipantFormData) => void;
    action: Action;
    idTodelete: string;
    selectedRosca: RoscaTypeExceptAdmins | null;
    setSelectedRosca: (rosca: RoscaTypeExceptAdmins | null) => void;
}
