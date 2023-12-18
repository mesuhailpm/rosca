import React from 'react'
import Confirmation from '@components/Confirmation'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'


const layout = ({ children }: { children: React.ReactNode }) => {
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