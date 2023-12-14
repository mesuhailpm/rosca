'use client'
import { useStore } from '@src/store'
import React from 'react'



const DeleteModal = ({}) => {
  const  {toggleDeleteModal, idTodelete, showDeleteModal, handleSubmit} = useStore()
  if(showDeleteModal)
  return (
    <div className=' flex bg-orange-400 flex-col gap-1 p-4 rounded-md items-center'>
        <h1 className=''>Are you sure delete the member</h1>
        <button className='bg-red-800 text-white w-3/5 rounded-lg' onClick={()=>handleSubmit(null,'remove',idTodelete)}>Yes</button>
        <button className='bg-blue-800 text-white w-3/5 rounded-lg' onClick={toggleDeleteModal}>No</button>

    </div>
  )
}

export default DeleteModal
