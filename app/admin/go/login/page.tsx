'use client'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useStore } from '@src/store'
import checkLoggedIn from '@utils/checkLoggedIn'



const AdminLogin = () => {


  const { isLoggedIn, runConfirmation,startResponseLoading, endResponseLoading } = useStore()
  const startRedirectingLoading = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')
  const startVerifyLoading = () => {startResponseLoading('Verfying the details...')}


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
    startResponseLoading('Verifying the details...')
    try {
      const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) })
      const { message, token, userName } = await response.json();

      if (response.ok) {
        localStorage.setItem('userObject', JSON.stringify({ token, userName }));
        useStore.setState({ isLoggedIn: true })
        location.href = '/admin/dashboard'
      } else {
        console.log(message, token, userName);

        runConfirmation(
          { message: message, success: false }

        )
        endResponseLoading()
      }
      // console.log(message)

    } catch (error) {
      console.error(error)
      endResponseLoading()
    }
  }

  useEffect(() => {
    (async () => {
      //console.log'useEffect');

      const hasLoggedIn = await checkLoggedIn(
        // startVerifyLoading, endResponseLoading, startRedirectingLoading
        )
      if(hasLoggedIn){
        startRedirectingLoading()
        setTimeout(() => {

          location.href = '/admin/dashboard';
        }, 2000)
      }
    })()


  }, [startResponseLoading])

  // if (startRedirectingLoading) return <div className='flex flex-col bg-gray-200/50 w-screen h-screen justify-center items-center'><Spinner color='#000000' /><h1 className='text-black font-bold '>Welcome back, we are shipping you to dashboard...</h1></div>

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
          Request to be an admin
        </Link>
      </form>
    </div>
  )
}

export default AdminLogin
