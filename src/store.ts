import { create } from "zustand";
import { State, Participants, Participant } from "@types";
import { FormEvent } from "react";
import { updateParticipant, addParticipant, deleteParticipant, fetchAllParticipants, } from "@actions";




export const useStore = create((set) => ({
  isLoggedIn: false,
  participants: [],
  responseLoading: true,
  idTodelete: { type: String, default: 0 },
  confirmationMessage: {
    message: '',
    success: false
  },
  formData: {
    _id: '', serial: 0, name: '', claimed: false
  },
  showConfirmation: false,
  showFormModal: false,
  showDeleteModal: false,
  toggleDeleteModal: () => {
    set((state: State) => ({
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
  setParticipants: (data: Participants) => {
    set(() => ({
      participants: data
    }))
  },
  handleSubmit: () => async (e: FormEvent<HTMLFormElement>, action: string, _id: string, formData: any) => {
    if (e) e.preventDefault()
    //console.logaction, _id, 'is id', formData, ' is formData');
    try {
      switch (action) {
        case 'edit':
          //console.log'action is edit and the id is ', _id)
          set(() => ({
            responseLoading: true
          }))
          // useStore.setState({responseLoading: true})
          const dataWithMessage = await updateParticipant(_id, JSON.stringify(formData))
          set(() => ({
            confirmationMessage: {
              message: dataWithMessage.message,
              success: true
            }
          }));
          // useStore.setState({
          //   confirmationMessage: {

          //     message: dataWithMessage.message,
          //     success: true
          //   }
          // })

          set((state: State) => ({
            participants: state.participants.map((participant: Participant) => {
              return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
            })

          }));

          // // const updatedArray = participants.map((participant: Participant) => {
          // //   return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
          // // })
          // useStore.setState({ participants: updatedArray })

          set(() => ({
            responseLoading: true
          }))
          // useStore.setState({ responseLoading: false })
          break;



        // case add:
        //   useStore.setState({ responseLoading: true })
        //   const dataWIthMessage = await addParticipant(formData)
        //   useStore.setState({
        //     message: dataWIthMessage.message,
        //     success: true
        //   })
        //   const participantCopy = participants
        //   participantCopy.push(dataWIthMessage.result)
        //   // setParticipants(participantCopy)
        //   useStore.setState(participantCopy)
        //   useStore.setState({ responseLoading: false })
        //   break;

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
        //   toggleDeleteModal()
        //   useStore.setState({ responseLoading: false })
        //   break
        default:
          set(() => ({
            responseLoading: false
          }))
          // useStore.setState({ responseLoading: false })
          //console.log'this is default action');
          break;
      }
    } catch (error) {
      //console.logerror, ' hanlde sumit failed nwith confirm message object', confirmationMessage)
      useStore.setState({ responseLoading: false })
      useStore.setState((
        { message: 'It doesn\'t work', success: false }
      ))
    }
  }

}));
