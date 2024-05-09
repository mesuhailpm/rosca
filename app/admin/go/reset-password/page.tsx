'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { updateAdmin } from '@actions'
import { useStore } from '@src/store';

const ResetAdminPassword = () => {
    const [formData, setFomData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const {startResponseLoading,endResponseLoading, runConfirmation} = useStore()
    const [storedUserObject, setStoredUserObject] = useState({ pendingAdmin: 'unauthorized' })
    const [initialLoading, setInitialLoading] = useState(true)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFomData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }

        })
    }
    const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            startResponseLoading('Wait, we are working on...')
            //...handle register
            console.log(formData);

            const data = await updateAdmin(formData)

            if (!data.success) {
                console.log('returned error')

                runConfirmation({
                    message:'Please contact the Owner',
                    success:false})


                return;
            }
            console.log(data)

            endResponseLoading()
            runConfirmation({ message: data.message, success: true })

            setTimeout(() => {
                location.href = '/admin/go/login'

            }, 4000)


        } catch (error) {
            console.error(error)
            endResponseLoading()
            runConfirmation({
                message:'Something went wrong',
                success:false})

        }


    }
    console.log(formData);



    useEffect(() => {
        const storedUserObjectRaw = localStorage.getItem('userObject')
        if (storedUserObjectRaw) {
            const parsedUserObject = JSON.parse(storedUserObjectRaw)
            setStoredUserObject(parsedUserObject)
            console.log(storedUserObjectRaw, parsedUserObject, storedUserObject)
            if (parsedUserObject.pendingAdmin !== 'unauthorized') {
                setFomData((prev) => {
                    return {
                        ...prev,
                        email: parsedUserObject.pendingAdmin
                    }
                })
            }
        };
        setInitialLoading(false)

    }, [])

    if (initialLoading) return <h1 className="text-2xl text-center ">Loading...</h1>


    if (storedUserObject.pendingAdmin === 'unauthorized') return (
        <div className='bg-blue-300/50 h-screen pt-4'>
            <h1 className='text-center font-bold uppercase'>Unauthorized</h1>

        </div>
    )

    return (
        <div className='bg-blue-300/50 h-screen pt-4'>
            <h1 className='text-center font-bold uppercase'>Choose a password</h1>
            <form className='flex flex-col items-center mt-4 font-sans' onSubmit={handleUpdate}>
                <label className='font-bold' htmlFor="email">Email</label>
                <input type="text" readOnly name='email' value={formData.email} className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm'/>
                <label className='font-bold' htmlFor="password">Password</label>
                <input type="password" name='password' value={formData.password} placeholder='Enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required onChange={handleChange} />
                <label className='font-bold' htmlFor="password">Confirm Password</label>
                <input type="password" name='confirmPassword' value={formData.confirmPassword} placeholder='Re-enter your password' className='w-[300px] pl-4 pr-4 p-1 border border-green-500 rounded-sm' required onChange={handleChange} />

                <button disabled={!((formData.password) && (formData.password === formData.confirmPassword))} type='submit' className='border border-none bg-green-600 text-yellow-100 m-4 pl-4 pr-4 p-2 rounded-md hover:bg-green-500 hover:border-white'>Change Password</button>
            </form>

        </div>
    )
}

export default ResetAdminPassword
