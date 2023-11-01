export const fetchAllParticipants = async () => {
  try {
    const response = await fetch("api/participants/all");
    const data = await response.json();
    console.log(data.allParticipants, " are all participants");
    return data.allParticipants;
  } catch (error) {
    console.log(error);
  }
};
export const updateParticipant = async (id, formData) => {
  // console.log(id, formData, ' from actions');
  try {
    const response = await fetch(`api/participants/edit/${id}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addParticipant = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch(`api/participants/add`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json(); //{data: 'particpant object', message: 'successflly updated'}
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteParticipant = async (id) => {
  console.log(id,' got in action');
  try {
    const response = await fetch(`api/participants/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data, ' is data returned');
    return data;

  } catch (error) {
    console.log(error);
  }
};
