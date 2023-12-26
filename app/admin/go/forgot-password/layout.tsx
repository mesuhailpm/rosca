'use client'
import React, { useEffect } from 'react'
import Confirmation from '@components/Confirmation'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import checkLoggedIn from '@utils/checkLoggedIn'
import { useStore } from '@src/store'
import { State } from '@types'


const layout = ({ children }: { children: React.ReactNode }) => {
    const { responseLoading, isLoggedIn } = useStore() as State


    const handleLoginLogout = async () => {
        const hasLoggedIn = await checkLoggedIn()
        if (hasLoggedIn) {
            useStore.setState({isLoggedIn:true})
            location.href='admin/go/login'
        }
    }

    useEffect(() => {
        handleLoginLogout()
    },[isLoggedIn]
    )
    return (
        <div className='p-2 '>
            {children}
            <Confirmation />
            <DeleteModal />
            <LoaderSpinner color='#000000' />
        </div>
    )
}

export default layout
