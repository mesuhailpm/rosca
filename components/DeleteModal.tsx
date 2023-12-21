'use client'
import { useStore } from '@src/store'
import { State } from '@types'
import React from 'react'
import useSubmit from '@hooks/useSubmitForm'



const DeleteModal = () => {
  const  {toggleShowDeleteModal, idTodelete, showDeleteModal} = useStore() as State
  const {setValue} = useSubmit()
  if(showDeleteModal)
  return (
    <div className='w-screen h-screen fixed top-0 left-0 border border-black justify-center flex flex-col gap-1 p-4 rounded-md items-center'>
      <div className='bg-orange-400 flex  flex-col  gap-2 rounded-2xl justify-center items-center p-4'>

        <h1 className=''>Are you sure delete the member?</h1>
        <button className='bg-red-800 text-white w-3/5 rounded-lg' onClick={()=>setValue({action:'remove',_id:idTodelete, formData:{}})}>Yes</button>
        <button className='bg-blue-800 text-white w-3/5 rounded-lg' onClick={toggleShowDeleteModal}>No</button>
      </div>

    </div>
  )
}

export default DeleteModal
