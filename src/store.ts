import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { State, Participants, Participant, ParticipantFormData, Action } from "@types";
import { FormEvent } from "react";
const initialFormData = {
  _id: '',
  serial: 0,
  name: '',
  claimed: false,
  roscaId: ''
}

const applyTimeout = (action: Function, time: number) => {
  setTimeout(() => {
    action()
  }, time)
}

export const useStore = create<State>((set) => ({
  adminLoading: true,

  setAdminLoading: (flag) => {
    set(() => ({
      adminLoading: flag
    }))
  },
  selectedRosca: null,
  setSelectedRosca: (rosca) => {
    set(() => ({
      selectedRosca: rosca
    }))
  },
  admin: null,
  participantFormData: initialFormData,
  setParticipantFormData: (data: ParticipantFormData) => {
    set(() => ({
      participantFormData: data
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


  FormVisibility: false,
  setFormVisibility: (flag: boolean) => {
    set(() => ({
      FormVisibility: flag
    }))
  },
  toggleFormVisibility: (action?: Action) => {
    set((state: State) => ({
      FormVisibility: !state.FormVisibility,
      action: action
    }))
  }
  ,

  deletePopupVisibility: false,
  setDeletePopupVisibility:(flag:boolean)=>{
    set({deletePopupVisibility: flag})
  },
  toggleDeletePopupVisibility: () => {
    set((state: State) => ({
      deletePopupVisibility: !state.deletePopupVisibility,

    } as State))
  },


  login: (admin) => {
    set(() => ({
      admin,
      isLoggedIn: true,
    }));
  },
  logOut: () => {
    set(() => ({
      admin: null,
      isLoggedIn: false,
    }));
  },

}));

