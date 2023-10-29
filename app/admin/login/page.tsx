'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'


const AdminLogin = () => {
  const [formData, setFomData] = useState({
    userName: '',
    password: ''
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFomData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }

    })
  }
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/login',{method: 'POST', body: JSON.stringify(formData)})
      const {message,token, userName} = await response.json();
      
      if(response.ok) {
        localStorage.setItem('userObject', JSON.stringify({token, userName}));
        location.href ='/spin'
      }
      // console.log(message)

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className='bg-blue-300 h-screen pt-4'>
      <h1 className='text-center font-bold uppercasef'>Login as admin</h1>
      <form action="" className='flex flex-col items-center mt-4 font-serif' onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={handleChange} name='userName' value={formData.userName} placeholder='Enter username' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handleChange} name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />

        <button type='submit' className='border border-none bg-green-600 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin