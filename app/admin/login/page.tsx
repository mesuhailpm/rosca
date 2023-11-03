'use client'
import Spinner from '@components/Spinner'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'


const AdminLogin = () => {
  const [verifyLoading, setVerifyLoading] = useState(true)
  const [redirectingLoading, setRedirectingLoading] = useState(false)

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

  const checkLoggedin =async () => {
    try {
      //console.log('checking');
      
      const userObject = await JSON.parse(localStorage.getItem('userObject') || '')
      const { token } = userObject
      //console.log(token, ' is token in local storage');
      
      // const isTokenValid = await verifyToken(token)
      const response = await fetch('/api/verifyToken', { method: 'POST', body: JSON.stringify(token) })
      
      const decodedData = await response.json()
      //console.log(decodedData, ' is decoded data from jsonwebtoken');
      if (decodedData) {
        setVerifyLoading(false)
        setRedirectingLoading(true)
        setTimeout(() =>{

          location.href = '/spin';
        },2000)
      }else{
        setVerifyLoading(false)
      }

      // console.log(new Date());
      // console.log( new Date(decodedData.exp*1000).toLocaleString())
      
    } catch (error) {
      //console.log(error)
      setVerifyLoading(false)
    }
  }

  useEffect(() => {
    (async() => {
      //console.log('useEffect');
      
      await checkLoggedin()
    })()
  
    
  }, [])
  
  if(verifyLoading) return <div className='flex flex-col w-screen h-screen justify-center items-center'> <Spinner /><h1>We are verfying the details</h1></div>
  if(redirectingLoading) return <div className='flex flex-col w-screen h-screen justify-center items-center'><Spinner/><h1>Welcome back, we are shipping you to dashboard...</h1></div>

  return (
    <div className='bg-blue-300 h-screen pt-4'>
      <h1 className='text-center font-bold uppercasef'>Login as admin</h1>
      <form action="" className='flex flex-col items-center mt-4 font-serif' onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={handleChange} name='userName' value={formData.userName} placeholder='Enter username' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handleChange} name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required />

        <button type='submit' className='border border-none bg-green-700 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Login</button>
      </form>
      <Link
        href="/admin/register"
        className="bg-green-900 p-2 text-yellow-100 m-2 hover:bg-green-700 flex-center"
      >
        Request to be an admin
      </Link>
    </div>
  )
}

export default AdminLogin