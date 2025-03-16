'use client'
import { useEffect } from 'react'
import checkLoggedIn from '@utils/checkLoggedIn'
import { useStore } from '@src/store'
import { State } from '@types'
import { usePathname } from 'next/navigation'
type LayoutProps = {
    section: 'user' | 'admin'
}

const Layout = ({ section }: LayoutProps) => {
    const { isLoggedIn, startResponseLoading, adminLoading } = useStore() as State

    const pathname = usePathname()

    const startRedirectingLoadingToAdmin = () => startResponseLoading('Welcome back, we are shipping you to dashboard...')
    const startRedirectingLoadingToUser = () => startResponseLoading('Unauthorized,  redirecting to login...')

    const handleLoginLogout = async () => {
        const hasLoggedIn = await checkLoggedIn()

        if (section === 'user') {
            if (hasLoggedIn) {
                startRedirectingLoadingToAdmin()
                setTimeout(() => {

                    if (location.href !== '/admin/dashboard') location.href = '/admin/dashboard/schemes'
                }, 1000)
            }

        } else { //means that section === 'admin' includes superadmin as well
            if (!adminLoading && !hasLoggedIn) {
                startRedirectingLoadingToUser()
                if (location.href !== '/admin/go/login') location.href = '/admin/go/login'
            }
            if (!( location.href.endsWith('/admin/dashboard/schemes') || location.href.includes('/admin/dashboard/superadmin' ))) location.href = '/admin/dashboard/schemes'
        }

    }



    useEffect(() => {
        // if loggedIn state inside store is changed that means that logged in already checked hencenot calling checking once again
        if (!isLoggedIn) { handleLoginLogout() }
    }, [isLoggedIn, pathname]
    )


    return null
}

export default Layout
