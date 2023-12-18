import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { State, Participants, Participant, FormData, Action, ConfirmationMessage, HandleSubmit } from "@types";
import { FormEvent } from "react";
import { updateParticipant, addParticipant, deleteParticipant, fetchAllParticipants, } from "@actions";

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
  participants: [/*{_id:'12fdrtrggdfge', name:'kunju', serial: 2, claimed: true}*/
  ],
  setParticipants: (participants: Participants) => {
    set((state: State) => (
      { participants: participants }
    ))

  },
  responseLoading: false,
  startResponseLoading: () => {
    set(() => ({ responseLoading: true }));
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
  runConfirmation: (messageObject: ConfirmationMessage) => {
    set({ confirmationMessage: messageObject } as State)
    applyTimeout(() => {
      set({ showConfirmation: true } as State)
    }, 10)
    applyTimeout(() => {
      set({
        showConfirmation: false,
        confirmationMessage: { message: '', success: false }
      } as State)
    }, 3000)


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
  // setParticipants: (data: Participants) => {
  //   set(() => ({
  //     participants: data
  //   }))
  // },
  _id: '',


}));

export const handleSubmit: HandleSubmit = async (e: FormEvent<HTMLFormElement>, action: Action, _id: string, formData: FormData) => {
  e.preventDefault();
  console.log('first')
  const { startResponseLoading, runConfirmation, endResponseLoading, participants, setParticipants } = useStore() as State;

  console.log(e, action, _id, 'is id', formData, ' is formData');
  try {
    switch (action) {
      case 'edit':
        //console.log'action is edit and the id is ', _id)`
        startResponseLoading();
        // useStore.setState({responseLoading: true})
        const dataWithMessage: { result: Participant, message: string } = await updateParticipant(_id, JSON.stringify(formData))
        console.log(dataWithMessage)
        if (!dataWithMessage) throw new Error;
        runConfirmation({ message: dataWithMessage.message, success: true })



        setParticipants(participants.map((participant: Participant) => {
          return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
        }));
        //bard suggested to use immer and draft array before updating directly, should do if necessary

        endResponseLoading();


        break;



      case 'add':
        startResponseLoading()
        const dataWIthMessage = await addParticipant(formData)
        if (!dataWIthMessage) throw new Error;
        runConfirmation({ message: dataWIthMessage.message, success: true })

        const participantCopy = participants
        participantCopy.push(dataWIthMessage.result)
        setParticipants(participantCopy)
        endResponseLoading();
        break;

      // case remove:
      //   useStore.setState({ responseLoading: true })
      //   const dataAndMessage = await deleteParticipant(_id)
      //   useStore.setState({
      //     message: dataAndMessage.message,
      //     success: true
      //   })
      //   const deletedParticipant = dataAndMessage.result
      //   if (deletedParticipant === undefined) throw new Error()
      //   // setParticipants((prev) => {
      //   //   return prev.filter((participant) => participant._id !== deletedParticipant._id)
      //   // })
      //   useStore.setState({ participants: participants.filter((participant: Participant) => participant._id !== deletedParticipant._id) })
      //   toggleShowDeleteModal()
      //   useStore.setState({ responseLoading: false })
      //   break
      // default:
      //   set(() => ({
      //     responseLoading: false
      //   }))
      //   // useStore.setState({ responseLoading: false })
      //   //console.log'this is default action');
      //   break;
    }
  } catch (error) {
    //console.logerror, ' hanlde sumit failed nwith confirm message object', confirmationMessage)
    endResponseLoading()
    console.log('this from error message');

    useStore.setState({ responseLoading: false });
    useStore.setState((
      { confirmationMessage: { message: 'It doesn\'t work', success: false } }
    ))
    useStore.setState({ showConfirmation: true });

  }
}
