'use client'
import { useStore } from '@src/store';
import { fetchAllParticipants } from '@actions'

import React, {  useEffect } from 'react'
import { State, Participant, Action, Participants, FormData } from '@types';


const MemberTable = ({ }) => {

  const { participants,toggleShowDeleteModal, toggleShowFormModal, showFormModal, formData, setShowFormModal, setFormData, startResponseLoading,endResponseLoading, participantsLoading, setParticipantsLoading } = useStore() as State
  const startRedirectingLoading = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')


  const initialFomData:FormData = {
    _id: '',
    serial: 0,
    name: '',
    claimed: false

  }



  const handleEdit = async (serial: number, name: string, claimed: boolean, action: Action, _id: string) => {
    // console.log(serial, name, claimed, action, _id, ' from handleEdit')
    setFormData({ _id, serial, name, claimed });
    toggleShowFormModal(action)
  }

  const handleDelete = (id: string) => {
    useStore.setState({idTodelete: id})
    toggleShowDeleteModal()
  }

  useEffect(() => {
    (async () => {
      setParticipantsLoading(true)
      const allParticipants:Participants = await fetchAllParticipants()
      allParticipants.sort((a, b) => a.serial - b.serial)
      useStore.setState({ participants: allParticipants });
      setParticipantsLoading(false)

    })()
  }, [])


  const add = 'add'
  const edit = 'edit'


  if(participantsLoading) return <h1 className='text-2xl font-bold text-white'>Loading...</h1>


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
      <tr className='bg-purple-500'><td colSpan={5} align='center'><button className='p-2 pr-4 pl-4 rounded-md bg-green-800 text-yellow-100 hover:text-green-500' onClick={() =>{setFormData(initialFomData);  toggleShowFormModal(add)}}>Want to add a member? click here</button></td></tr>
    </tbody>

  </table>)
}




export default MemberTable;
