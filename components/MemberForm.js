import React from 'react'

const MemberForm = ({handleSubmit, title, handleChange,formData,toggleModal}) => {
    const {serial, name, claimed} = formData
  return (
    <form className='relative bg-red-400 flex flex-col gap-1 p-4 rounded-md' onSubmit={handleSubmit}>
      <button className='absolute right-[5%] top-[5%] border border-black pl-1 pr-1 rounded-md' onClick={toggleModal}>x</button>
        <h1 className='text-center'>{`${title} a member`}</h1>
        <label htmlFor="serial">Serial</label>
        <input type="number" name='serial' max={30} maxLength={2} onChange={handleChange} value={serial}/>
        <label htmlFor="name" >Name</label>
        <input type="text" id='name' name='name' onChange={handleChange} value={name}/>
        <label htmlFor="claimed">Claimed</label>
        <select id='claimed' name='claimed' onChange={handleChange} value={claimed}>
            <option value="">Please select an option</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </select>
        <br />
        <button type="submit" className='border bg-blue-800 hover:border-black w-20 rounded-lg text-[f5ff10] self-center p-2 '>{title}</button>
    </form>
  )
}

export default MemberForm
