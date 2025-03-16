import {  CustomRosca} from "@components/RoscaElement";
import { AdminModelType, ParticipantFormData, Participant, RoscaTypeExceptAdmins, RoscaType, Participants } from "@types";

export const fetchSchemes = async () => {
  try {
    const {token} = JSON.parse(localStorage.getItem("userObject")|| '');
    if(!token) {throw new Error('Token not found')}
    
      const res = await fetch(`/api/schemes/`, { headers: {
        'Authorization': `Bearer ${token}`
      }});
      const fetchedSchemes: RoscaTypeExceptAdmins[] = await res.json(); 
      return fetchedSchemes;
  } catch (error: any) {
      console.log(error);
      return error.message as string
  }
}

type FetchSchemeParticipants = (roscaId: string) => Promise<{
  data: Participants;
  success: true;
  message: string;
} | {
  message: string;
  success: false;
}>

export const fetchSchemeParticipants: FetchSchemeParticipants = async (roscaId: string) => {
  try {
    const {token} = JSON.parse(localStorage.getItem("userObject")|| ''); 
    if(!token) {throw new Error('Token not found')}

    const response = await fetch(`/api/schemes/${roscaId}`,{ headers: {
      'Authorization': `Bearer ${token}`
    }}); //   const response = await fetch("/api/participants/all");

    if(!response.ok) {
      const {message, success}:{message: string, success: false} = await response.json()

      return {message , success}
    }

    const { scheme, success }:{scheme: CustomRosca, success: true} = await response.json();
    
    return {data : scheme.participants ,success, message: 'Details fetched'}
  } catch (error: any) {
    return {message: error?.message as string || 'Unable to fetch members', success: false}
  }
};

type UpdateParticipant = (id: string, formData: ParticipantFormData) => Promise<{ result: Participant, message: string }>
export const updateParticipant: UpdateParticipant = async (id, formData) => {

  try {
    const response = await fetch(`/api/participants/edit/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}

    return data;
  } catch (error) {
    console.log(error);
  }
};

type AddParticipant = (formData: ParticipantFormData) => Promise<{ result: Participant, message: string, success: true }|{ result: undefined, message: string, success: false }>


export const addParticipant: AddParticipant = async (formData) => {
  const {token} = JSON.parse(localStorage.getItem("userObject")|| ''); 
  if(!token) {throw new Error('Token not found')}

  try {
    const response = await fetch(`/api/participants/add`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {'Authorization': `Bearer ${token}`}
    });


      
      const {result = undefined, message,success} = await response.json(); //{data: 'particpant object', message: 'successflly updated'}

      return {result ,message,success}
  } catch (error) {
    throw error
  }
};

type DeleteParticipant = (id: string) => Promise<{ result: Participant, message: string }>

export const deleteParticipant: DeleteParticipant = async (id) => {

  try {
    const response = await fetch(`/api/participants/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}

    return data;
  } catch (error) {
    console.log(error);
  }
};

type InitiateRegister = (formData: { email: string, password: string, confirmPassword: string }) => Promise<{ message: string, success: boolean, error?: Error }>

export const initiateRegister: InitiateRegister = async (credentials) => {
  try {
    const response = await fetch(`/api/admin/otp/`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
  }
};
type InitiateForgotPassword = (formData: { email: string }) => Promise<{ message: string, success?: true }>


export const initiateForgotPassword: InitiateForgotPassword = async (credentials) => {
  try {
    const response = await fetch(`/api/admin/forgot/`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
  }
};

type VerifyOTP = (formData: { otp: string, admin: string }) => Promise<{ message: string, success: boolean }>


export const verifyOTP: VerifyOTP = async (otpandadmin) => {
  try {
    const response = await fetch(`/api/admin/verifyOtp/`, {
      method: "POST",
      body: JSON.stringify(otpandadmin),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

type VerifyOtpForgot = (formData: { otp: string, admin: string }) => Promise<{ message: string, success: boolean }>


export const verifyOtpForgot: VerifyOtpForgot = async (otpandadmin) => {
  try {
    const response = await fetch(`/api/admin/verifyOtpForgot/`, {
      method: "POST",
      body: JSON.stringify(otpandadmin),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

type CreateAdmin = (formData: { email: string }) => Promise<{ newAdmin?: AdminModelType, message: string, success: boolean }>


export const createAdmin: CreateAdmin = async ({ email }) => {
  try {
    const response = await fetch(`/api/admin/create/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

type UpdateAdmin = (formData: { email: string }) => Promise<{ updatedAdmin: Participant, message: string, success: boolean, error?: true }>

export const updateAdmin: UpdateAdmin = async (credentials) => {

  try {

    const response = await fetch(`/api/admin/update/${credentials.email}`, { method: 'POST', body: JSON.stringify(credentials) });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
