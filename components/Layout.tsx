'use client'
import { useEffect } from 'react'
import checkLoggedIn from '@utils/checkLoggedIn'
import { useStore } from '@src/store'
import { State } from '@types'
type LayoutProps = {
    section: 'user' | 'admin'
}

const Layout = ({ section }: LayoutProps) => {
    const { isLoggedIn, startResponseLoading } = useStore() as State

    const startRedirectingLoadingToAdmin = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')
    const startRedirectingLoadingToUser = () => startResponseLoading('Unauthorized,  redirecting...')

    const handleLoginLogout = async () => {
        const hasLoggedIn = await checkLoggedIn()

        if (section === 'user') {
            if (hasLoggedIn) {
                startRedirectingLoadingToAdmin()
                useStore.setState({ isLoggedIn: true })
                setTimeout(() => {

                    useStore.setState({ isLoggedIn: true })
                    if (location.href !== '/admin/dashboard') location.href = '/admin/dashboard'
                }, 1000)
            } else {
                localStorage.removeItem('userObject');
                if(location.href !==  '/admin/go/login') location.href !==  '/admin/go/login'
            }

        } else {
            if (hasLoggedIn) {
                useStore.setState({ isLoggedIn: true })
            } else {
                useStore.setState({ isLoggedIn: false })

                startRedirectingLoadingToUser()
                localStorage.removeItem('userObject');
                if(location.href !== '/admin/go/login') location.href = '/admin/go/login'
            }
        }

    }



    useEffect(() => {
        handleLoginLogout()
    }, [isLoggedIn]
    )


    return null
}

export default Layout
