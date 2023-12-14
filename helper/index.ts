'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useStore } from "@src/store";
import { addParticipant, deleteParticipant, updateParticipant } from "@actions";
import { Participant, State } from "@types";



const { responseLoading, confirmationMessage, participants } = useStore() as State


const edit = 'edit'
const add = 'add'
const remove = 'remove'


const initialFomData = {
  _id: '',
  serial: 0,
  name: '',
  claimed: false

}

const [formData, setFormData] = useState(initialFomData)
const [showDeleteModal, setShowDeleteModal] = useState(false);
const toggleDeleteModal = () => setShowDeleteModal((prev) => !prev);



export const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value
    }
  })

}


export const handleSubmit = async (e: FormEvent<HTMLFormElement>, action: string, _id: string, formData: any) => {
  if (e) e.preventDefault()
  //console.logaction, _id, 'is id', formData, ' is formData');
  try {
    switch (action) {
      case edit:
        //console.log'action is edit and the id is ', _id)
        useStore.setState({responseLoading: true})
        const dataWithMessage = await updateParticipant(_id, JSON.stringify(formData))
        useStore.setState({
          message: dataWithMessage.message,
          success: true
        })

        const updatedArray = participants.map((participant: Participant) => {
          return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
        })
        useStore.setState({ participants: updatedArray })
        useStore.setState({responseLoading: false})
        break;
      case add:
        useStore.setState({responseLoading: true})
        const dataWIthMessage = await addParticipant(formData)
        useStore.setState({
          message: dataWIthMessage.message,
          success: true
        })
        const participantCopy = participants
        participantCopy.push(dataWIthMessage.result)
        // setParticipants(participantCopy)
        useStore.setState(participantCopy)
        useStore.setState({responseLoading: false})
        break;

      case remove:
        useStore.setState({responseLoading: true})
        const dataAndMessage = await deleteParticipant(_id)
        useStore.setState({
          message: dataAndMessage.message,
          success: true
        })
        const deletedParticipant = dataAndMessage.result
        if (deletedParticipant === undefined) throw new Error()
        // setParticipants((prev) => {
        //   return prev.filter((participant) => participant._id !== deletedParticipant._id)
        // })
        useStore.setState({ participants: participants.filter((participant: Participant) => participant._id !== deletedParticipant._id) })
        toggleDeleteModal()
        useStore.setState({responseLoading: false})
        break
      default:
        useStore.setState({responseLoading: false})
        //console.log'this is default action');
        break;
    }
  } catch (error) {
    //console.logerror, ' hanlde sumit failed nwith confirm message object', confirmationMessage)
    useStore.setState({responseLoading: false})
    useStore.setState( (
      {message:'It doesn\'t work', success: false }
    ))
  }
}
