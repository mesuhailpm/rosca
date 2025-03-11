'use client'
import { useStore } from '@src/store'
import { State } from '@types'
import React, { useEffect } from 'react'
import useSubmit from '@hooks/useSubmitForm'



const DeleteModal = () => {
  const  {toggleShowDeleteModal, idTodelete, showDeleteModal, selectedRosca, setShowDeleteModal} = useStore() as State
  const {serFormValue} = useSubmit()


    useEffect(()=>{
      const handleKey = (e: KeyboardEvent) =>{
        console.log(e.key)
        if(e.key === 'Escape'){
          setShowDeleteModal (false)
        }
  
      }
  
      if (showDeleteModal)document.addEventListener('keydown',handleKey)
  
      return () => document.removeEventListener('keydown',handleKey)
  
    },[showDeleteModal])
  

  return (
    <div className={`w-screen h-screen fixed top-0 left-0 border border-black justify-center flex flex-col gap-1 p-4 rounded-md items-center modal ${showDeleteModal && 'appear'}` }>
      <div className='bg-orange-400 flex  flex-col  gap-2 rounded-2xl justify-center items-center p-4'>

        <h1 className=''>Are you sure delete the member?</h1>
        <button className='bg-red-800 text-white w-3/5 rounded-lg' onClick={()=>serFormValue({action:'remove', formData: {serial:0, name:'', _id: idTodelete,  claimed: false, roscaId: selectedRosca?._id as string}})}>Yes</button>
        <button className='bg-blue-800 text-white w-3/5 rounded-lg' onClick={toggleShowDeleteModal}>No</button>
      </div>

    </div>
  )
}

export default DeleteModal
