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

    const startRedirectingLoading = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')

    const handleLoginLogout = async () => {
        const hasLoggedIn = await checkLoggedIn()

        if (hasLoggedIn) {
            if (section === 'user') {
                if (hasLoggedIn) {
                    startRedirectingLoading()
                    useStore.setState({ isLoggedIn: true })
                    setTimeout(() => {

                        useStore.setState({ isLoggedIn: true })
                        location.href = '/admin/dashboard'
                    }, 1000)
                } else {
                    localStorage.removeItem('userObject');
                    location.href = '/admin/go/login'
                }

            }
            else {
                if (hasLoggedIn) {
                    useStore.setState({ isLoggedIn: true })
                } else {
                    localStorage.removeItem('userObject');
                    location.href = '/admin/go/login'
                }
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
