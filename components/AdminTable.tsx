'use client'
import React from 'react'
import { useStore } from '@src/store'
import { AdminModelType, State } from '@types'

import { useState, useEffect } from 'react'

const AdminTable = () => {
    const [admins, setAdmins] = useState<Array<AdminModelType>>()
      const [loading, setLoading] = useState(true)
    
    
    const { runConfirmation, startResponseLoading, endResponseLoading } = useStore() as State
      
      
    useEffect(()=>{
        setLoading(true)
        const {token} = JSON.parse(localStorage.getItem("userObject")|| '')

        const headers= {
            'Authorization': `Bearer ${token}`
          }
    
        const fetchAdmins = async () => {
    
    
            const response = await fetch(`/api/superadmin/admins`, { next: { revalidate: 60 },headers }) // revalidate every 60 seconds
            const admindatafromserver: { admins: AdminModelType[] } = await response.json()
            setAdmins(admindatafromserver.admins);
            setLoading(false)
        }
        fetchAdmins()
    },[])



    const handleDeleteAdmin = async (username: string) => {
        if(!admins) return;
        if (confirm('Are you sure you want to delete the admin? This is not reversible')) {
            try {
                startResponseLoading('Removing from database...')
                const response = await fetch(`/api/admin/delete/${username}`, { method: 'DELETE' })
                const data: { message: string, error?: any } = await response.json()
                if (data.error) {
                    endResponseLoading()
                    runConfirmation({ message: data.error, success: false })
                } else {
                    endResponseLoading()

                    runConfirmation({
                        message: data.message,
                        success: true
                    })
                    const newAdmins = admins.filter(admin => admin.userName !== username)
                    setAdmins(newAdmins)
                }

            } catch (error: any) {
                console.log(error)
                endResponseLoading()
                runConfirmation({ message: error, success: false })
            }
        }

    }



    if (loading ) return <h1 className='text-white' > Loading Admin Data..</h1>

    if (admins?.length) {


        return (
            <div className='flex flex-col m-2 w-full items-start text-white'>
            <h2 className='text-3xl font-semibold m-[1rem] text-yellow-500'>All Admins</h2>
                
                <table className=' bg-green-800/75  font-raleway m-4 rounded-lg border-none'>
                    <thead>
                        <tr className='border-none'>

                            <th className='border-none'>Admin</th>
                            <th className='border-none'>Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index} className='border-none' >
                                <td className='hover:text-black hover:bg-white border-none'>{admin.userName}</td>
                                <td className='cursor-pointer hover:text-black hover:bg-white border-none' onClick={() => handleDeleteAdmin(admin.userName)}>Delete</td>
                            </tr>
                        ))}
                    </tbody>

                </table>


            </div>
        )
    }
}

export default AdminTable