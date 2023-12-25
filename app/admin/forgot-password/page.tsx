'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { initiateForgotPassword } from '@actions'
import Confirmation from '@components/Confirmation'
import Spinner from '@components/Spinner'
import { useStore } from '@src/store';
import { State } from '@types';

const ForgotPassword = () => {
    const [formData, setFomData] = useState({
        email: ''
    })

    const { runConfirmation } = useStore() as State
    const [loading, setLoading] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState({ message: '', success: false })
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFomData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }

        })
    }
    const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            //...handle for got password request
            setLoading(true)
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
            console.log(data)
            //if everything works and OTP send it get {message: 'some message'} otherwise will get {data: {message: 'some message}}

            //handle undesired result

            runConfirmation(
                {
                    message: data.message,
                    success: true
                }
            )
            
            setTimeout(() => {
                location.href = 'forgot-password/verify'

            }, 1000)

        } catch (error) {
            console.error(error)
            runConfirmation({
                message: 'something went wrong',
                success: false
            })
        } finally {
            setLoading(false)
            setTimeout(() => {


            }, 3000)
        }

    }
    return (
        <section>

            <div className='bg-blue-300/50 h-screen pt-4'>
                <h1 className='text-center font-bold uppercase'>Reset your password</h1>
                <form className='flex flex-col items-center mt-4 font-sans' onSubmit={handleForgotPassword}>
                    <label className='font-bold' htmlFor="email">Enter your registered e-mail</label>
                    <input type="text" name='email' value={formData.email} placeholder='Enter your e-mail' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required
                        onChange={handleChange} />


                    <button disabled={!formData.email} type='submit' className='border border-none bg-green-600 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Verify</button>
                </form>
                {loading && (
                    <div className='fixed top-0 right-0 flex flex-col gap-4 bg-gray-200/50 items-center w-screen h-screen justify-center'> <Spinner color='#000000' /><h1 className='text-black font-bold'>Validating...</h1></div>
                )}

            </div>















        </section>
    );
};

export default ForgotPassword;
