'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import {initiateRegister} from '@actions'

const RegisterAsAdmin = () => {
    const [formData, setFomData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFomData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }

        })
    }
    const handleRegister = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            //...handle register
            initiateRegister(formData)
        } catch (error) {
            console.error(error)
        }

    }
console.log(formData)

    return (
        <div className='bg-blue-300/50 h-screen pt-4'>
            <h1 className='text-center font-bold uppercasef'>Register as admin</h1>
            <form action="" className='flex flex-col items-center mt-4 font-sans' onSubmit={handleRegister}>
                <label className='font-bold' htmlFor="email">Email</label>
                <input type="text" name='email' value={formData.email} placeholder='Recommended to use mobile number' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required
                    onChange={handleChange} />
                <label className='font-bold' htmlFor="password">Password</label>
                <input type="password" name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required  onChange={handleChange}/>
                <label className='font-bold' htmlFor="password">Confirm Password</label>
                <input type="password" name='confirmPassword' value={formData.confirmPassword} placeholder='Re-enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required  onChange={handleChange} />

                <button disabled={!((formData.email) && (formData.password) && (formData.password === formData.confirmPassword))} type='submit' className='border border-none bg-green-600 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Register</button>
            </form>
        </div>
    )
}

export default RegisterAsAdmin
