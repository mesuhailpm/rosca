'use client'
import Spinner from '@components/Spinner'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Confirmation from '@components/Confirmation'
import { useStore } from '@src/store'



const AdminLogin = () => {
  const [verifyLoading, setVerifyLoading] = useState(true)
  const [redirectingLoading, setRedirectingLoading] = useState(false)
  const [showConfirmation, setShowCinfirmation] = useState(false);
  let [confirmationMessage, setconfirmationMessage] = useState({
    message: '',
    success: true,
  })

  const {isLoggedIn} = useStore()

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
      const response = await fetch('/api/login',{method: 'POST', body: JSON.stringify(formData)})
      const {message,token, userName} = await response.json();

      if(response.ok) {
        localStorage.setItem('userObject', JSON.stringify({token, userName}));
        useStore.setState({isLoggedIn:true})
        location.href ='/spin'
      }else{
        setVerifyLoading(false)
      setconfirmationMessage({message: message, success: false})
    }
      // console.log(message)

    } catch (error) {
      console.error(error)

    }
  }
  useEffect(() => {


    if(confirmationMessage.message){
      setShowCinfirmation(true)
    setTimeout(() => {
      setconfirmationMessage({message: '', success: false})
      setShowCinfirmation(false)
      },2000
      )}
    },[confirmationMessage,formData]
      )

  const checkLoggedin =async () => {
    try {
      //console.log'checking');
      const userObjectRaw = localStorage.getItem('userObject')
      if(!userObjectRaw) return;
      const userObject = JSON.parse(userObjectRaw)
      const { token } = userObject
      //console.logtoken, ' is token in local storage');

      // const isTokenValid = await verifyToken(token)
      const response = await fetch('/api/verifyToken', { method: 'POST', body: JSON.stringify(token) })

      const decodedData = await response.json()
      //console.logdecodedData, ' is decoded data from jsonwebtoken');
      if (response.ok) {
        setVerifyLoading(false)
        setRedirectingLoading(true)
        setTimeout(() =>{

         location.href = '/spin';
        },2000)
      }else{
        setVerifyLoading(false)
      }

    } catch (error) {
      console.log(error)
      setVerifyLoading(false)
    }finally{
      setVerifyLoading(false)
    }
  }

  useEffect(() => {
    (async() => {
      //console.log'useEffect');

      await checkLoggedin()
    })()


  }, [])

  if(verifyLoading) return <div className='flex flex-col gap-4 bg-gray-200/50 w-screen h-screen justify-center items-center'> <Spinner color='#000000'/><h1 className='text-black font-bold'>Verfying the details...</h1></div>
  if(redirectingLoading) return <div className='flex flex-col bg-gray-200/50 w-screen h-screen justify-center items-center'><Spinner color='#000000'/><h1 className='text-black font-bold '>Welcome back, we are shipping you to dashboard...</h1></div>

  return (
    <div className=' pt-4 flex flex-col justify-center'>
      <form action="" className='flex flex-col items-center mt-4 bg-blue-300/[0.6] pt-4 mb-5 font-serif' onSubmit={handleLogin}>
      <h1 className='text-center font-bold uppercase'>Login as admin</h1>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={handleChange} name='userName' value={formData.userName} placeholder='Enter username' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handleChange} name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />

        <button type='submit' className='border border-none bg-green-700 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Login</button>
      <Link
        href="/admin/register"
        className="bg-green-900 p-2 text-yellow-100 m-2 hover:bg-green-700 flex-center"
      >
        Request to be an admin
      </Link>
      </form>
      {showConfirmation ? <Confirmation confirmationMessage={confirmationMessage}/>:<></>}
    </div>
  )
}

export default AdminLogin
