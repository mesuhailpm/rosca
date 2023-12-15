'use client'
import Spinner from '@components/Spinner'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Confirmation from '@components/Confirmation'
import { useStore } from '@src/store'
import checkLoggedIn from '@utils/checkLoggedIn'



const AdminLogin = () => {
  const [verifyLoading, setVerifyLoading] = useState(true)
  const [redirectingLoading, setRedirectingLoading] = useState(false)
  const [showConfirmation, setShowCinfirmation] = useState(false);
  let [confirmationMessage, setconfirmationMessage] = useState({
    message: '',
    success: true,
  })

  const { isLoggedIn } = useStore()

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
    setVerifyLoading(true)
    try {
      const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) })
      const { message, token, userName } = await response.json();

      if (response.ok) {
        localStorage.setItem('userObject', JSON.stringify({ token, userName }));
        useStore.setState({ isLoggedIn: true })
        location.href = '/admin'
      } else {
        setVerifyLoading(false)
        setconfirmationMessage({ message: message, success: false })
      }
      // console.log(message)

    } catch (error) {
      console.error(error)

    }
  }
  useEffect(() => {


    if (confirmationMessage.message) {
      setShowCinfirmation(true)
      setTimeout(() => {
        setconfirmationMessage({ message: '', success: false })
        setShowCinfirmation(false)
      }, 2000
      )
    }
  }, [confirmationMessage, formData]
  )

  useEffect(() => {
    (async () => {
      //console.log'useEffect');

      const hasLoggedIn = await checkLoggedIn(setVerifyLoading, setRedirectingLoading)
      if(hasLoggedIn){
        setTimeout(() => {

          location.href = '/admin';
        }, 2000)
      }
    })()


  }, [])

  if (verifyLoading) return <div className='flex flex-col gap-4 bg-gray-200/50 w-screen h-screen justify-center items-center'> <Spinner color='#000000' /><h1 className='text-black font-bold'>verifying the details...</h1></div>
  if (redirectingLoading) return <div className='flex flex-col bg-gray-200/50 w-screen h-screen justify-center items-center'><Spinner color='#000000' /><h1 className='text-black font-bold '>Welcome back, we are shipping you to dashboard...</h1></div>

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
          href="/forgot-password"
          className='underline text-blue-950'
        >
          Forgot password?
        </Link >
        <Link
          href="/admin/register"
          className="bg-green-900 p-2 text-yellow-100 m-2 hover:bg-green-700 flex-center"
        >
          Request to be an admin
        </Link>
      </form>
      {showConfirmation ? <Confirmation confirmationMessage={confirmationMessage} /> : <></>}
    </div>
  )
}

export default AdminLogin
