'use client'
import React, { useEffect } from 'react'
import Confirmation from '@components/Confirmation'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import checkLoggedIn from '@utils/checkLoggedIn'
import { useStore } from '@src/store'
import { State } from '@types'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='p-2 '>
            {children}
            <Confirmation />
            <LoaderSpinner color='#000000' />
        </div>
    )
}

export default layout
