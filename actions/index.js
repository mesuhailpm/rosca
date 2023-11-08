export const fetchAllParticipants = async () => {
  try {
    const response = await fetch("api/participants/all",{
      revalidate: 10, // revalidate the cache every 10 seconds
    });
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
    const data = await response.json();//{data: 'particpant object', message: 'successflly updated'}
    //console.logdata, ' is data returned');
    return data;

  } catch (error) {
    console.log(error);
  }
};
