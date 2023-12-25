import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { State, Participants, Participant, FormData, Action } from "@types";
import { FormEvent } from "react";
const initialFormData = {
  _id: '',
  serial: 0,
  name: '',
  claimed: false

}

const applyTimeout = (action: Function, time: number) => {
  setTimeout(() => {
    action()
  }, time)
}

export const useStore = create<State>((set) => ({
  formData: initialFormData,
  setFormData: (formData: FormData) => {
    set(() => ({
      formData: formData
    }))

  },

  isLoggedIn: false,
  
  participantsLoading:true,
  setParticipantsLoading:(flag: boolean)=>{
    set({participantsLoading: flag});
  },
  participants: [/*{_id:'12fdrtrggdfge', name:'kunju', serial: 2, claimed: true}*/
  ],
  setParticipants: (participants: Participants) => {
    set((state: State) => (
      { participants: participants }
    ))

  },
  responseLoading: false,
  loadingCaption:'',
  startResponseLoading: (caption) => {
    set(() => ({ responseLoading: true, loadingCaption: caption}));
  },
  endResponseLoading: () => applyTimeout(() => set({ responseLoading: false }), 10),

  idTodelete: '',

  confirmationMessage: {
    message: '',
    success: false
  },
  action: '',
  showConfirmation: false,
  setShowConfirmation: (flag: boolean) => {
    set(() => ({
      showConfirmation: flag
    }))
  },
  runConfirmation: (messageObject, time) => {
    set({ confirmationMessage: messageObject })
    applyTimeout(() => {
      set({ showConfirmation: true })
    }, 10)
    applyTimeout(() => {
      set({
        showConfirmation: false,
        confirmationMessage: { message: '', success: false }
      })
    }, time || 3000)


  },


  showFormModal: false,
  setShowFormModal: (flag: boolean) => {
    set(() => ({
      showFormModal: flag
    }))
  },
  toggleShowFormModal: (action?: Action) => {
    set((state: State) => ({
      showFormModal: !state.showFormModal,
      action: action
    }))
  }
  ,

  showDeleteModal: false,
  setShowDeleteModal:(flag:boolean)=>{
    set({showDeleteModal: flag})
  },
  toggleShowDeleteModal: () => {
    set((state: State) => ({
      showDeleteModal: !state.showDeleteModal,

    } as State))
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

}));

