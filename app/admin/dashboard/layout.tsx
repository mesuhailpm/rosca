import Confirmation from '@components/Confirmation'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Layout from '@components/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nammude Kuri- നമ്മുടെ കുറി | Dashboard',
    description: 'നമ്മുടെ കുറി ആപ്പ്',
    manifest: '/manifest.json',
    icons: { apple: '/icon-192x192.png' },
    themeColor: '#FFFFFF'
  }
  

const layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            <Layout section='admin' />
            {children}
            <Confirmation />
            <DeleteModal />
            <LoaderSpinner color='#000000' />
        </div>
    )
}

export default layout
