'use client'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useStore } from '@src/store'
import { home } from '@constants/paths'
import { useRouter } from 'next/navigation'



const AdminLogin = () => {


  const { runConfirmation,startResponseLoading, endResponseLoading, login } = useStore()
  const startRedirectingLoading = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')

  const [formData, setFomData] = useState({
    userName: '',
    password: ''
  })
  const router = useRouter()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFomData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }

    })
  }
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startResponseLoading('Verifying the details...')
    try {
      const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) })

      if(!response.ok){
        runConfirmation(
          { message: await  response.json().then(data=> data.message), success: false }
        )
        endResponseLoading()
        return
      }
      else{
        const { message, data :{token, userName, adminId }} = await response.json();        
          localStorage.setItem('userObject', JSON.stringify({ token, userName, adminId }));
          login({userName, adminId})
      }
    startRedirectingLoading()
    router.push(home)
    endResponseLoading()
    } catch (error) {
      console.error(error)
      endResponseLoading()
    }
  }

  return (
    <div className=' pt-4 flex flex-col justify-center'>
      <form action="" className='flex flex-col items-center mt-4 bg-blue-300/[0.6] pt-4 mb-5 font-serif' onSubmit={handleLogin}>
        <h1 className='text-center font-bold uppercase'>Login as admin</h1>
        <label htmlFor="username">E-mail</label>
        <input type="email" onChange={handleChange} name='userName' value={formData.userName} placeholder='Enter username' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handleChange} name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />

        <button type='submit' className='border border-none bg-green-700 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Login</button>
        <Link
          href="/admin/go/forgot-password"
          className='underline text-blue-950'
        >
          Forgot password?
        </Link >
        <Link
          href="/admin/go/register"
          className="bg-green-900 p-2 text-yellow-100 m-2 hover:bg-green-700 flex-center"
        >
          Register as an admin
        </Link>
      </form>
    </div>
  )
}

export default AdminLogin
