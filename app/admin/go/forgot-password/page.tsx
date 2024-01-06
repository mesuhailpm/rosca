'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { initiateForgotPassword } from '@actions'
import { useStore } from '@src/store';
import { State } from '@types';

const ForgotPassword = () => {
    const [formData, setFomData] = useState({
        email: ''
    })

    const { runConfirmation, startResponseLoading, endResponseLoading } = useStore() as State

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFomData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }

        })
    }


    const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            //...handle for got password request
            startResponseLoading('Hold on..')
            const storedUserObjectRaw = localStorage.getItem("userObject");

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


            const data = await initiateForgotPassword(formData)
            //if everything works and OTP send it get {message: 'some message',success:true} otherwise will get {message:'some message indicating it can proceed'}
            //handle undesired result

            if (!data.success) {
                endResponseLoading()
                throw new Error(data.message)
            }

            //If OTP is send successfully

            endResponseLoading()

            runConfirmation(
                {
                    message: data.message,
                    success: true
                }
            )

            setTimeout(() => {
                location.href = 'forgot-password/verify'

            }, 1000)

        } catch (error: any) {
            console.error(error)
            runConfirmation({
                message: error?.message ? error.message : 'something went wrong',
                success: false
            })
        }

    }
    return (
        <section className='bg-blue-300/50 h-screen pt-4'>
            <h1 className='text-center font-bold uppercase'>Reset your password</h1>
            <form className='flex flex-col items-center mt-4 font-sans' onSubmit={handleForgotPassword}>
                <label className='font-bold' htmlFor="email">Enter your registered e-mail</label>
                <input type="text" name='email' value={formData.email} placeholder='Enter your e-mail' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required
                    onChange={handleChange} />
                <button disabled={!formData.email} type='submit' className='border border-none bg-green-600 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Verify</button>
            </form>
        </section>
    );
};

export default ForgotPassword;
