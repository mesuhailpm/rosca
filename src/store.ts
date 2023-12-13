import { create } from "zustand";


type Participant = {
  name: string,
  serial: number,
  claimed: boolean
}
type Participants = Participant[]

interface State {
  isLoggedIn: boolean;
  Participants: Participants; // Define Participant type here
  responseLoading: boolean;
  confirmationMessage: ConfirmationMessage;
  showDeleteModal: boolean;
}

interface ConfirmationMessage {
  message: string;
  success: boolean;
}

export const useStore = create((set) => ({
  isLoggedIn: false,
  participants: [],
  responseLoading: true,
  confirmationMessage:{
    message:'',
    success: false
  },
  showDeleteModal:false,
  toggleDeleteModal:()=>{
    set((state:State)=>({
    showDeleteModal: !state.showDeleteModal
  }))
},
  login: () => {
    set(() => ({
      isLoggedIn: true,
    }));
  },
  logOut: () => {
    set(() => ({
      isLoggedIn: false,
    }));
  },
  setParticipants: (data: Participants) =>{
    set(() => ({
      participants: data
    }))
  }
}));
