'use client'
import { useStore } from '@src/store'
import { State } from '@types'
import React from 'react'



const DeleteModal = () => {
  const  {toggleShowDeleteModal, idTodelete, showDeleteModal, handleSubmit} = useStore() as State
  if(showDeleteModal)
  return (
    <div className=' flex bg-orange-400 flex-col gap-1 p-4 rounded-md items-center'>
        <h1 className=''>Are you sure delete the member</h1>
        <button className='bg-red-800 text-white w-3/5 rounded-lg' onClick={()=>handleSubmit(null,'remove',idTodelete)}>Yes</button>
        <button className='bg-blue-800 text-white w-3/5 rounded-lg' onClick={toggleShowDeleteModal}>No</button>

    </div>
  )
}

export default DeleteModal
