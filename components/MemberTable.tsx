'use client'
import { useStore } from '@src/store';
import { fetchAllParticipants, addParticipant, updateParticipant, deleteParticipant } from '@actions'
import checkLoggedIn from '@utils/checkLoggedIn'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { State, Participants, Participant, Action } from '@types';


const MemberTable = ({ }) => {
  const [loading, setLoading] = useState<IndexState['loading']>(true)
  const [responseLoading, setResponseLoading] = useState<IndexState['loading']>(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [ideToDelete, setIdToDelete] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false);
  let [confirmationMessage, setconfirmationMessage] = useState({
    message: '',
    success: true,
  })
  const toggleShowDeleteModal = () => setShowDeleteModal((prev) => !prev)

  const { participants, toggleShowFormModal, showFormModal, formData, setShowFormModal, setFormData } = useStore() as State


  const initialFomData: IndexState['formData'] = {
    _id: '',
    serial: 0,
    name: '',
    claimed: false

  }
  // const toggleShowFormModal = (action: string) => {
  //   setShowFormModal((prev) => !prev)
  //   setFormData(initialFomData)
  //   if (!showFormModal) { setAction(action) }//setAction when closing modal is causing error ' object can't be react child'

  // }


  const handleEdit = async (serial: number, name: string, claimed: boolean, action: Action, _id: string) => {
    console.log(serial, name, claimed, action, _id, ' from handleEdit')
    setFormData({ _id, serial, name, claimed });
    toggleShowFormModal(action)
  }

  const handleDelete = (id: string) => {
    setIdToDelete(id)
    toggleShowDeleteModal()
  }
  // //console.logparticipants, ' are participants');
  const [showForm, setShowForm] = useState(false)
  // //console.lognotClaimedParticipantNames);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [e.target.name]: e.target.value
  //   }))
  // }









  const handleToken = async () => {

    const hasLoggedIn = await checkLoggedIn(setLoading)
    if (!hasLoggedIn) {

      localStorage.removeItem('userObject')
      location.href = '/admin/login';
    }

  }

  useEffect(() => {
    handleToken()
  }, [])

  useEffect(() => {
    if (confirmationMessage.message) {
      setShowConfirmation(true);
      setShowDeleteModal(false); setShowFormModal(false)
      setTimeout(() => {
        setShowConfirmation(false);
        setconfirmationMessage({
          message: '',
          success: false
        })
      }, 2000)
    }

  }, [confirmationMessage.message])






  useEffect(() => {
    (async () => {
      setLoading(true)
      const allParticipants = await fetchAllParticipants()
      allParticipants.sort((a: participant, b: participant) => a.serial - b.serial)
      useStore.setState({ participants: allParticipants });
      setLoading(false)

    })()
  }, [])


  const add = 'add'
  const edit = 'edit'

  interface participant {
    _id: string,
    name: string,
    serial: number,
    claimed: boolean,

  }
  interface IndexState {
    participant: {};
    participants: participant[];
    notClaimedParticipantNames: string[];
    winnerToBeDeclared: string;
    loading: boolean;
    formData: {
      _id: string;
      serial: number;
      name: string;
      claimed: boolean;
    }
  }



  return (<table className='max-w-lg bg-slate-700 w-full table-auto'>
    <thead>
      <tr className='bg-blue-900 text-white'>
        <td>Sl No</td>
        <td>Name</td>
        <td>Claimed</td>
        <td colSpan={2}>Action</td>
      </tr>
    </thead>
    <tbody>
      {participants?.map((participant, index) => {
        const { serial, name, claimed, _id } = participant as Participant
        return (
          <tr key={index} className={`${!(index % 2) ? 'bg-sky-500 text-teal-100' : 'text-slate-200'}`}>
            <td>{serial}</td>
            <td>{name}</td>
            <td>{claimed === true ? 'Yes' : 'No'}</td>
            <td className='hover:text-yellow-500'><button onClick={() => handleEdit(serial, name, claimed, edit, _id)}><i className="fas fa-edit"></i></button></td>
            <td className='hover:text-red-500'><button onClick={() => handleDelete(_id)}><i className="fa-solid fa-trash"></i></button></td>
          </tr>)
      }
      )
      }
      <tr className='bg-purple-500'><td colSpan={5} align='center'><button className='p-2 pr-4 pl-4 rounded-md bg-green-800 text-yellow-100 hover:text-green-500' onClick={() => toggleShowFormModal(add)}>Want to add a member? click here</button></td></tr>
    </tbody>

  </table>)
}




export default MemberTable;
