
import { useStore } from "@src/store";
import { updateParticipant, addParticipant, deleteParticipant } from "@actions";
import { Participant, State } from "@types";
import { useEffect, useState } from "react";

const initialValue: {
  action: string,
  formData: {
    serial: number;
    name: string;
    _id?: string;
    claimed: boolean;
    roscaId: string;
}} = { action: '', formData: {serial:0, name:'', _id:'', claimed: false, roscaId: ''} }

const useSubmitForm = () => {
  const { startResponseLoading, endResponseLoading, setParticipants, runConfirmation, participants, setFormVisibility,setDeletePopupVisibility } = useStore() as State

  const [formValue, serFormValue] = useState(initialValue)
  const { action, formData } = formValue;

  
  const handleSubmit = async () => {

    try {
      switch (action) {
        case 'edit':
          startResponseLoading();
          if(formData.serial < 1) { throw Error('Invalid serial provided')}
          if(!formData._id){ throw new Error('No participant Id passed to update.')}
          if(String(formData.claimed) ==="" || !formData.name || !formData.serial) { throw Error( 'All fields must be filled')};
          const dataWithMessage: { result: Participant, message: string } = await updateParticipant(formData._id, formData)
          if (!dataWithMessage) throw new Error;
          runConfirmation({ message: dataWithMessage.message, success: true })
          setFormVisibility(false);

          setParticipants(participants.map((participant: Participant) => {
            return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
          }));
          endResponseLoading();


          break;



        case 'add':
          startResponseLoading()

          if(formData.serial < 1) { throw Error('Invalid serial provided')}
          if(String(formData.claimed) === "" || !formData.name || !formData.serial) { throw Error( 'All fields must be filled')}
          const data = await addParticipant(formData),{success,message,result} = data
          if (!data) throw new Error('Something went wrong');
          if(success){
            runConfirmation({ message, success })
            const participantCopy = participants
            participantCopy.push(result)
            setParticipants(participantCopy)
            setFormVisibility(false)

          }else{
            runConfirmation({message, success})
          }
          
          endResponseLoading();
          break;

        case 'remove':
          startResponseLoading();
          if(!formData._id){
            throw new Error('Error: No ID received!')
          }
          const dataAndMessage = await deleteParticipant(formData._id)
          runConfirmation({
            message: dataAndMessage.message,
            success: true
          }
          )
          const deletedParticipant = dataAndMessage.result
          if (deletedParticipant === undefined) throw new Error()
         
          useStore.setState({ participants: participants.filter((participant) => participant._id !== deletedParticipant._id) })
          setDeletePopupVisibility(false)
          endResponseLoading();
          break;

      }
    } catch (error: any) {
      endResponseLoading()

      runConfirmation(
        { message: error.message || 'It doesn\'t work', success: false } 
      )


    }

  }
  useEffect(() => {
    if (action) {
      handleSubmit()
    }
  }, [action, formValue,serFormValue]);
  
  return { formValue, serFormValue }

}

export default useSubmitForm
