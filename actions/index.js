
export const fetchAllParticipants = async () => {
    try {
      const response = await fetch("api/participants/all");
      const data = await response.json();
      
    //   setParticipants(data.allParticipants);
    } catch (error) {
      console.log(error);
    }
  };