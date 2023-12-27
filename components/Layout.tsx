'use client'
import { useEffect } from 'react'
import checkLoggedIn from '@utils/checkLoggedIn'
import { useStore } from '@src/store'
import { State } from '@types'


const layout = () => {
    const {isLoggedIn, startResponseLoading } = useStore() as State


    const handleLoginLogout = async () => {
        const hasLoggedIn = await checkLoggedIn()
        if (hasLoggedIn) {
            startRedirectingLoading()

            setTimeout(() =>{

                useStore.setState({isLoggedIn:true})
                location.href='/admin/dashboard'
            },1000)
        }
    }

    const startRedirectingLoading = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')


    useEffect(() => {
        handleLoginLogout()
    },[isLoggedIn]
    )


    return null
}

export default layout
