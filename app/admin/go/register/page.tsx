'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { initiateRegister } from '@actions'
import { useStore } from '@src/store';
import { State } from '@types';

const RegisterAsAdmin = () => {
    const [formData, setFomData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { runConfirmation, startResponseLoading, endResponseLoading } = useStore() as State
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFomData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }

        })
    }
    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            startResponseLoading('Sending the OTP')

            const { message, success, error } = await initiateRegister(formData)//sending OTP to the email
            if (error) {

                endResponseLoading()
                console.log(error);

                throw new Error(error.message)
            }

            console.log(message)
            runConfirmation({ message, success })
            endResponseLoading();
            const storedUserObjectRaw = localStorage.getItem('userObject')
            //Storing the email to the local storage in order to show in OTP page
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
                location.href = '/admin/go/verify'

            }, 1000)

        } catch (error: any) {
            console.error(error)
            runConfirmation({
                message: error.message && error.message | error,
                success: false,
            })
        }

    }

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

        </div>
    )
}

export default RegisterAsAdmin
