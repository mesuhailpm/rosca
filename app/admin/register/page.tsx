'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { initiateRegister } from '@actions'
import Spinner from '@components/Spinner'
import checkLoggedIn from '@utils/checkLoggedIn';
import { useStore } from '@src/store';
import { State } from '@types';

const RegisterAsAdmin = () => {
    const [formData, setFomData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const {runConfirmation} = useStore() as State
    const [loading, setLoading] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState({ message: '', success: false })
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFomData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }

        })
    }
    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            //...handle register
            setLoading(true)
            const { message } = await initiateRegister(formData)
            if (!message) {
                console.log('returned error')
                setShowConfirmation(true)
                setConfirmationMessage(
                    {
                        message: 'Please contact the Owner',
                        success: false
                    }
                )

                return;
            }
            console.log(message)
            setConfirmationMessage({ message, success: true })
            setLoading(false)
            setShowConfirmation(true)
            const storedUserObjectRaw = localStorage.getItem('userObject')
            if (storedUserObjectRaw) {
                const userObject = JSON.parse(storedUserObjectRaw)
                localStorage.setItem('userObject', JSON.stringify({
                    ...userObject,
                    pendingAdmin: formData.email,
                }))
            } else {
                localStorage.setItem('userObject', JSON.stringify({
                    pendingAdmin: formData.email,
                }))
            }

            setTimeout(() => {
                location.href = 'verify'

            }, 1000)

        } catch (error: any) {
            console.error(error)
            runConfirmation({
                message: error.message,
                success: false,
            })
        } finally {
            setLoading(false)
            setTimeout(() => {
                setShowConfirmation(false)

            }, 2000)
        }

    }
    useEffect(()=>{
        (async () =>{
            const hasLoggedIn = await checkLoggedIn()
            if(hasLoggedIn){
                location.href='/admin/login'
            }
        })()
    })

    return (
        <div className='bg-blue-300/50 h-screen pt-4'>
            <h1 className='text-center font-bold uppercase'>Register as admin</h1>
            <form action="" className='flex flex-col items-center mt-4 font-sans' onSubmit={handleRegister}>
                <label className='font-bold' htmlFor="email">Email</label>
                <input type="email" name='email' value={formData.email} placeholder='Enter your e-mail' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required
                    onChange={handleChange} />
                <label className='font-bold' htmlFor="password">Password</label>
                <input type="password" name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required onChange={handleChange} />
                <label className='font-bold' htmlFor="password">Confirm Password</label>
                <input type="password" name='confirmPassword' value={formData.confirmPassword} placeholder='Re-enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required onChange={handleChange} />

                <button disabled={!((formData.email) && (formData.password) && (formData.password === formData.confirmPassword))} type='submit' className='border border-none bg-green-600 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Register</button>
            </form>
            {loading && (
                <div className='fixed top-0 right-0 flex flex-col gap-4 bg-gray-200/50 items-center w-screen h-screen justify-center'> <Spinner color='#000000' /><h1 className='text-black font-bold'>Sending the OTP...</h1></div>
            )}
            
        </div>
    )
}

export default RegisterAsAdmin
