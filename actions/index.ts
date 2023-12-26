import { FormData, Participant } from "@types";

export const fetchAllParticipants = async () => {
  try {
    const response = await fetch("/api/participants/all");
    const data = await response.json();
    // console.log(data.allParticipants, " are all participants");
    return data.allParticipants;
  } catch (error) {
    console.log(error);
  }
};

type UpdateParticipant = (id: string, formData: FormData) => Promise<{ result: Participant, message: string }>
export const updateParticipant: UpdateParticipant = async (id, formData) => {
  console.log(id, formData, ' from updateParticipant actions');
  try {
    const response = await fetch(`/api/participants/edit/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    //console.logdata, 'from updateParticipant It should contain the error');
    return data;
  } catch (error) {
    console.log(error);
  }
};

type AddParticipant = (formData: FormData) => Promise<{ result: Participant, message: string }>


export const addParticipant: AddParticipant = async (formData) => {
  //console.logformData);
  try {
    const response = await fetch(`/api/participants/add`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    //console.logdata, ' is the result after creating a new participant');
    return data;
  } catch (error) {
    console.log(error);
  }
};

type DeleteParticipant = (id: string) => Promise<{ result: Participant, message: string }>

export const deleteParticipant: DeleteParticipant = async (id) => {
  //console.logid,' got in action');
  try {
    const response = await fetch(`/api/participants/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    //console.logdata, ' is data returned');
    return data;
  } catch (error) {
    console.log(error);
  }
};

type InitiateRegister = (formData: {email: string, password:string, confirmPassword: string}) => Promise<{ message: 'string' }>

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
type InitiateForgotPassword = (formData: {email:string}) => Promise<{ message: 'string' }>


export const initiateForgotPassword: InitiateForgotPassword = async (credentials) => {
  try {
    const response = await fetch(`/api/admin/forgot/`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log("returning", { data });
      return { data, error: true };
    }
  } catch (error) {
    console.log(error);
    return { data: "nothing to return", error: true };
  }
};

type VerifyOTP = (formData: {otp:string, admin: string}) => Promise<{ message: string, success:boolean}>


export const verifyOTP: VerifyOTP = async (otpandadmin) => {
  try {
    const response = await fetch(`/api/admin/verifyOtp/`, {
      method: "POST",
      body: JSON.stringify(otpandadmin),
    });
    const data = await response.json();
    console.log(data, " is data");
    return data;
  } catch (error) {
    console.log(error);
  }
};

type VerifyOtpForgot = (formData: {otp:string, admin:string}) => Promise<{ message: string, success:boolean}>


export const verifyOtpForgot: VerifyOtpForgot = async (otpandadmin) => {
  try {
    const response = await fetch(`/api/admin/verifyOtpForgot/`, {
      method: "POST",
      body: JSON.stringify(otpandadmin),
    });
    const data = await response.json();
    console.log(data, " is data");
    return data;
  } catch (error) {
    console.log(error);
  }
};

type CreateAdmin = (formData: {email: string}) => Promise<{ data: Participant, message: string }>


export const createAdmin: CreateAdmin = async ({ email }) => {
  try {
    const response = await fetch(`/api/admin/create/${email}`);
    const data = await response.json();
    console.log(data, " is data");
    return data;
  } catch (error) {
    console.log(error);
  }
};

type UpdateAdmin = (formData: {email: string}) => Promise<{ updatedAdmin: Participant, message: string, success: boolean, error?: true }>

export const updateAdmin: UpdateAdmin = async (credentials) => {

  try {
    console.log('email is ' + credentials.email);
    const response = await fetch(`/api/admin/update/${credentials.email}`, { method: 'POST', body: JSON.stringify(credentials) });
    const data = await response.json();
    console.log(data, " is data");
    return data;
  } catch (error) {
    console.log(error);
  }
}
