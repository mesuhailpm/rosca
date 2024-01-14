'use client'
import React from 'react'
import { useStore } from '@src/store'
import { AdminModelType, State } from '@types'

import { useState, useEffect } from 'react'

const AdminTable = ({ admindatafromserver }: { admindatafromserver: AdminModelType[] }) => {
    const [admins, setAdmins] = useState<Array<AdminModelType>>(admindatafromserver)
    const { runConfirmation, startResponseLoading, endResponseLoading } = useStore() as State




    const handleDeleteAdmin = async (username: string) => {
        if (confirm('Are you sure you want to delete the admin? This is not reversible')) {
            try {
                startResponseLoading('Fetching data...')
                const response = await fetch(`/api/admin/delete/${username}`, { method: 'DELETE' })
                const data: { message: string, error?: any } = await response.json()
                if (data.error) {
                    endResponseLoading()
                    runConfirmation({ message: data.error, success: false })
                    console.log(data.error)
                } else {
                    endResponseLoading()
                    console.log(data.message)
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



    // const fetchAdmins = async () => {
    //     try {
    //         const response = await fetch('/api/admin')
    //         const alladmins = await response.json()
    //         console.log(alladmins);
    //         (alladmins)

    //         setAdmins(alladmins.admins)
    //     } catch (error) {
    //         console.log(error)

    //     }

    // }



    // useEffect(() => {
    //     fetchAdmins()

    // }, [])

    if (admins?.length) {


        return (
            <div className='flex flex-col w-full m-2'>

                <table className='self-center bg-green-800/75 text-white font-raleway m-4'>
                    <thead>
                        <tr>

                            <th>Admin</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index} className='' >
                                <td className='hover:text-black hover:bg-white'>{admin.userName}</td>
                                <td className='cursor-pointer hover:text-black hover:bg-white' onClick={() => handleDeleteAdmin(admin.userName)}>Delete</td>
                            </tr>
                        ))}
                    </tbody>

                </table>


            </div>
        )
    }
}

export default AdminTable