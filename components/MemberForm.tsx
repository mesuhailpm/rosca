"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useStore } from "@src/store";
import { Action, HandleSubmit, Participant, State } from "@types";
import { addParticipant, deleteParticipant, updateParticipant } from "@actions";
import { FormData } from "@types";

const MemberForm = ({ }) => {
  const { formData, toggleShowFormModal, showFormModal, action } = useStore() as State;
  const [componentActionTitle, setComponentActionTitle] = useState(action)
  const actionAsTitle = componentActionTitle && (`${componentActionTitle[0]?.toUpperCase()}${componentActionTitle.slice(1)}`)
  const submitButtonLabel = action === "edit" ? "Update" : "Create";
  const { startResponseLoading, runConfirmation, endResponseLoading, participants, setParticipants, setShowFormModal, toggleShowDeleteModal } = useStore() as State;

  const [componentFormData, setComponentFormData] = useState(formData)
  const { serial, claimed, name } = componentFormData;

  const handleSubmit: HandleSubmit = async (e: FormEvent<HTMLFormElement>, action: Action, _id: string, formData: FormData) => {
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
          setShowFormModal(false)
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
          setShowFormModal(false)
          endResponseLoading();
          break;

        case 'remove':
          startResponseLoading()
          const dataAndMessage: { message: string, result: Participant } = await deleteParticipant(_id)
          if (!dataAndMessage) throw new Error;
          runConfirmation({
            message: dataAndMessage.message,
            success: true
          })
          const deletedParticipant = dataAndMessage.result
          if (deletedParticipant === undefined) throw new Error
          
          setParticipants(participants.filter((participant) => participant._id !== deletedParticipant._id))
          toggleShowDeleteModal();
          break;
        default:
          endResponseLoading()
          break;
      }
    } catch (error) {
      endResponseLoading()
      console.log('this from error message');
      runConfirmation({message:'Something went wrong', success: false})

    }
  }


  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setComponentFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })

  }

  console.log(useStore())
  useEffect(() => {
    setComponentFormData(formData)
    setComponentActionTitle(action)

  }, [formData, action])
  if (showFormModal) {

    return (
      <div
        className={`fixed w-screen h-screen top-0 left-0 flex items-center justify-center  modal ${showFormModal && 'appear'}`}
      >
        <form
          className={`relative bg-red-400 flex flex-col gap-1 p-4 rounded-md`}
          onSubmit={(e) => handleSubmit(e, action, formData._id, componentFormData)}
        >
          <button
            type="button"
            className="absolute right-[5%] top-[5%] p-1 rounded-md bg-teal-300 flex hover:text-red-500"
            onClick={() => toggleShowFormModal()}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <h1 className="text-center">{`${actionAsTitle} a member${showFormModal}`}</h1>
          <label htmlFor="serial">Serial</label>
          <input
            type="number"
            id="serial"
            name="serial"
            max={30}
            maxLength={2}
            onChange={handleChange}
            value={String(serial)}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={name}
          />
          <label htmlFor="claimed">Claimed</label>
          <select
            id="claimed"
            name="claimed"
            onChange={handleChange}
            value={claimed.toString()}
          >
            <option value="">Please select an option</option>
            <option value={true.toString()}>Yes</option>
            <option value={false.toString()}>No</option>
          </select>
          <br />
          <button
            type="submit"
            className="border bg-blue-800 hover:border-black w-20 rounded-lg text-[#f5ffff] self-center p-2 "
          >
            {submitButtonLabel}
          </button>
        </form>
      </div>

    );
  } else return null;
};

export default MemberForm;
