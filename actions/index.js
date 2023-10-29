
export const fetchAllParticipants = async () => {
    try {
      const response = await fetch("api/participants/all");
      const data = await response.json();
      console.log( data.allParticipants, ' are all participants');
      return data.allParticipants
    } catch (error) {
      console.log(error);
    }
  };