'use client'
import { useStore } from '@src/store';
import { fetchSchemeParticipants} from '@actions'

import React, {  useEffect, useState } from 'react'
import { State, Participant, Action, Participants, ParticipantFormData } from '@types';
import {noto_serif_malayalam} from '@fonts'
import { useRouter } from '@node_modules/next/navigation';
import { schemes} from '@constants/paths'



const MemberTable = ({ }) => {

  const { participants,toggleDeletePopupVisibility, setParticipants, runConfirmation, selectedRosca, toggleFormVisibility, FormVisibility, participantFormData, setFormVisibility, setParticipantFormData, startResponseLoading,endResponseLoading, participantsLoading, setParticipantsLoading } = useStore() as State

  const router = useRouter()
  const [tooltip, setTooltip] = useState<string | null>(null); // State for managing the tooltip
  const [reason, setReason] = useState<string>()


  const handleDoubleClick = (updatedAt: string) => {
    setTooltip(updatedAt); // Set the tooltip to the updatedAt value
    setTimeout(() => setTooltip(null), 3000); // Hide the tooltip after 3 seconds
  };



  const initialFomData:ParticipantFormData = {
    serial: 0,
    name: '',
    claimed: false,
    roscaId: selectedRosca?._id as string,

  }



  const handleEditClick = async (serial: number, name: string, claimed: boolean, action: Action, _id: string, roscaId: string) => {
    setParticipantFormData({ _id, serial, name, claimed, roscaId });
    toggleFormVisibility(action)
  }

  const handleDeleteClick = (id: string) => {
    useStore.setState({idTodelete: id})
    toggleDeletePopupVisibility()
  }

  useEffect(() => {
    if(selectedRosca){(async () => {
      try {
        
        setParticipantsLoading(true)
        const result : { data:  Participants, success: true} | { message: string, success: false} = await fetchSchemeParticipants (selectedRosca?._id), {success} = result
        if (success){  
          const {data} = result        
          data.sort((a, b) => a.serial - b.serial)
          setParticipants(data)
        }else{
          const {message}=  result
          setReason(message)

          
          runConfirmation({ message , success })
        }
        setParticipantsLoading(false)

      } catch (error: any) {
        const errorMessage = error.message || 'Something went wrong'
          
        runConfirmation({message: errorMessage, success: false })
        setParticipantsLoading(false)
      }
      

    })()} else {
      router.push(schemes)
    }
   
  }, [selectedRosca])


  const add = 'add'
  const edit = 'edit'
  
  if(!selectedRosca) return <h1 className='text-white'>No Scheme selected</h1>
      if(participantsLoading) return <h1 className='text-2xl font-bold text-white'>Loading...</h1>


  return ( <React.Fragment>
    {participants.length ? (
      
   
      <table className='max-w-lg bg-slate-700/5 w-full table-auto'>
    <thead>
      <tr className='bg-blue-900/75 text-white'>
        <td>Sl No</td>
        <td>Name</td>
        <td>Claimed</td>
        <td colSpan={2}>Action</td>
      </tr>
    </thead>
    <tbody>
      {participants?.map((participant, index) => {
        const { serial, name, claimed, _id, updatedAt } = participant as Participant
        return (
          <tr key={index} className={`${!(index % 2) ? 'bg-sky-500/75 text-teal-100' : 'text-slate-200'}`}>
            <td>{serial}</td>
            <td 
            className={`${noto_serif_malayalam.className} hover:bg-slate-700`}
                    onDoubleClick={() => handleDoubleClick(updatedAt.toString())} // Trigger tooltip on double-click
            >
              {name}
              {tooltip && tooltip.toString() === updatedAt.toString() && (
                      <div className="tooltip absolute bg-black text-white p-2 rounded-md text-xs">
                        Last Updated: {`${new Date(updatedAt as unknown as string).toLocaleTimeString('en-IN',{day:'2-digit', month: 'short', year:'numeric'})}`}
                      </div>
                    )}
            </td>
            <td>{claimed === true ? 'Yes' : 'No'}</td>
            <td className='hover:text-yellow-700 text-yellow-300'><button onClick={() => handleEditClick(serial, name, claimed, edit, _id, selectedRosca?._id as string)}><i className="fas fa-edit"></i></button></td>
            <td className='hover:text-red-900 text-red-500'><button onClick={() => handleDeleteClick(_id)}><i className="fa-solid fa-trash"></i></button></td>
          </tr>)
      }
      )
      }
      
    </tbody>

  </table>
   ): (
    
    <div className='text-center text-white m-2'>
      <p className='text-2xl m-[1rem]'> {reason || 'No Participants to Show'}
      </p>
      <p className='text-xl'>Please add members to see the list here.</p>
    </div>
   )}

  
    <section className='w-full flex justify-evenly bg-purple-500 border-none font-semibold'>
        <button className='hover:text-yellow-500 hover:bg-black w-full rounded-md' onClick={() => router.back()}><i className="fas fa-arrow-left m-2"></i> Back</button>
        <button className='w-full hover:bg-black hover:text-green-400 p-2 pr-4 pl-4 rounded-md'  onClick={() =>{setParticipantFormData(initialFomData);  toggleFormVisibility(add)}}><i className="fas fa-plus m-2"></i> Add New Member</button>
        </section>
</React.Fragment>
  )
}




export default MemberTable;
