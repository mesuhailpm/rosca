export const fetchAllParticipants = async () => {
  try {
    const response = await fetch("api/participants/all");
    const data = await response.json();
    //console.logdata.allParticipants, " are all participants");
    return data.allParticipants;
  } catch (error) {
    console.log(error);
  }
};
export const updateParticipant = async (id, formData) => {
  //console.logid, formData, ' from updateParticipant actions');
  try {
    const response = await fetch(`api/participants/edit/${id}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    //console.logdata, 'from updateParticipant It should contain the error');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addParticipant = async (formData) => {
  //console.logformData);
  try {
    const response = await fetch(`api/participants/add`, {
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

export const deleteParticipant = async (id) => {
  //console.logid,' got in action');
  try {
    const response = await fetch(`api/participants/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    //console.logdata, ' is data returned');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const initiateRegister = async (credentials) => {
  try {
    const response = await fetch(`/api/admin/otp/`, {
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
  }
};

export const initiateForgotPassword = async (credentials) => {
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

export const verifyOTP = async (otpandadmin) => {
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

export const verifyOtpForgot = async (otpandadmin) => {
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


export const createAdmin = async ({ email }) => {
  try {
    const response = await fetch(`/api/admin/create/${email}`);
    const data = await response.json();
    console.log(data, " is data");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAdmin = async (credentials) => {

  try {
    console.log('email is ' + credentials.email);
    const response = await fetch(`/api/admin/update/${credentials.email}`,{method: 'POST', body: JSON.stringify(credentials)});
    const data = await response.json();
    console.log(data, " is data");
    return data;
  } catch (error) {
    console.log(error);
  }
}
