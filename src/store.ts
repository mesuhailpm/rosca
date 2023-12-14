import { create } from "zustand";
import { State, Participants } from "@types";




export const useStore = create((set) => ({
  isLoggedIn: false,
  participants: [],
  responseLoading: true,
  confirmationMessage:{
    message:'',
    success: false
  },
  formData:{
    _id:'', serial:0, name:'', claimed:false
  },
  showFormModal: false,
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
