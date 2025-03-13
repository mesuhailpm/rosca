import { AdminModelType, ParticipantFormData, Participant, RoscaTypeExceptAdmins } from "@types";

export const fetchSchemes = async (adminId: string) => {
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

export const fetchSchemeParticipants= async (roscaId: string) => {
  try {
    const {token} = JSON.parse(localStorage.getItem("userObject")|| ''); 
    if(!token) {throw new Error('Token not found')}

    const response = await fetch(`/api/schemes/${roscaId}`,{ headers: {
      'Authorization': `Bearer ${token}`
    }}); //   const response = await fetch("/api/participants/all");
    console.log(response)
    if(!response.ok) {
      const {message, success} = await response.json()
      console.log({message})
      return {message , success}
    }

    const { scheme, success } = await response.json();
    
    return {data : scheme.participants ,success}
  } catch (error) {
    console.log(error);
    throw error
  }
};

type UpdateParticipant = (id: string, formData: ParticipantFormData) => Promise<{ result: Participant, message: string }>
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

type AddParticipant = (formData: ParticipantFormData) => Promise<{ result: Participant, message: string, success: true }|{ result: undefined, message: string, success: false }>


export const addParticipant: AddParticipant = async (formData) => {
  const {token} = JSON.parse(localStorage.getItem("userObject")|| ''); 
  if(!token) {throw new Error('Token not found')}

  //console.logformData);
  try {
    const response = await fetch(`/api/participants/add`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {'Authorization': `Bearer ${token}`}
    });
    console.log(response)

      
      const {result = undefined, message,success} = await response.json(); //{data: 'particpant object', message: 'successflly updated'}

      return {result ,message,success}
  } catch (error) {
    throw error
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

type InitiateRegister = (formData: { email: string, password: string, confirmPassword: string }) => Promise<{ message: string, success: boolean, error?: Error }>

export const initiateRegister: InitiateRegister = async (credentials) => {
  try {
    const response = await fetch(`/api/admin/otp/`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    console.log(data);


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
    console.log('email is ' + credentials.email);
    const response = await fetch(`/api/admin/update/${credentials.email}`, { method: 'POST', body: JSON.stringify(credentials) });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
