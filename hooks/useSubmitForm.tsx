
import { useStore } from "@src/store";
import { updateParticipant, addParticipant, deleteParticipant } from "@actions";
import { Action, FormData, HandleSubmit, Participant, Participants, State } from "@types";
import { useEffect, useState } from "react";

type formValueProp = {
  action: Action | '',
  _id: string,
  formData: FormData | {}
}// some properties are redundant but passed blank for type validation, and actually unnecessary

const initialValue = { action: '', _id: '', formData: {serial:0, name:'', _id:'', claimed: false} }
const useSubmitForm = () => {
  const { startResponseLoading, endResponseLoading, setParticipants, runConfirmation, participants, toggleShowDeleteModal, setShowFormModal,setShowDeleteModal } = useStore() as State

  const [formValue, serFormValue] = useState(initialValue)
  const { action, _id, formData } = formValue;
  console.log('I got acation as : ', action);



  const handleSubmit = async () => {

    try {
      switch (action) {
        case 'edit':
          startResponseLoading();
          const dataWithMessage: { result: Participant, message: string } = await updateParticipant(_id, formData)
          if (!dataWithMessage) throw new Error;
          runConfirmation({ message: dataWithMessage.message, success: true })
          setShowFormModal(false);

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
          setShowFormModal(false)

          const participantCopy = participants
          participantCopy.push(dataWIthMessage.result)
          setParticipants(participantCopy)
          endResponseLoading();
          break;

        case 'remove':
          startResponseLoading();
          const dataAndMessage = await deleteParticipant(_id)
          runConfirmation({
            message: dataAndMessage.message,
            success: true
          }
          )
          const deletedParticipant = dataAndMessage.result
          if (deletedParticipant === undefined) throw new Error()
         
          useStore.setState({ participants: participants.filter((participant) => participant._id !== deletedParticipant._id) })
          setShowDeleteModal(false)
          endResponseLoading();
          break;

      }
    } catch (error) {
      //console.logerror, ' hanlde sumit failed nwith confirm message object', confirmationMessage)
      endResponseLoading()
      console.log(error,'this from error message');
      setShowFormModal(false)
      setShowDeleteModal(false);
      runConfirmation(
        { message: 'It doesn\'t work', success: false } 
      )


    }

  }
  useEffect(() => {
    if (action) {
      handleSubmit()
    }
  }, [action, _id,serFormValue]);
  
  return { formValue, serFormValue }

}

export default useSubmitForm
