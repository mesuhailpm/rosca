'use client';

import { useStore } from "@src/store";
import { updateParticipant, addParticipant } from "@actions";
import { FormData, HandleSubmit, Participant } from "@types";


const useSubmitForm =  () => {
    const {startResponseLoading, endResponseLoading, setParticipants,runConfirmation, participants} = useStore()
    const handleSubmit :HandleSubmit  = async (e,action,_id,formData) => {
        e.preventDefault();
        console.log('first')
      
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

    
  return handleSubmit
    
}

//export default useSubmitForm