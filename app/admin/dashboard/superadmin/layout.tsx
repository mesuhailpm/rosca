import Confirmation from '@components/Confirmation'
import LoaderSpinner from '@components/Spinner'
import Layout from '@components/Layout'
import AdminTable from '@components/AdminTable'
import { AdminModelType } from '@types'
import SecretTable from '@components/SecretTable'
import eye from 'public/assets/images/eye.svg'
import hidden from 'public/assets/images/hide.svg'


console.log()
const layout = async ({ children }: { children: React.ReactNode}) => {

    console.log(process.env.NEXT_PUBLIC_SITE_URL, ' is base URL')

    const fetchAdmins = async() => {

        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin`,{next:{ revalidate:60}}) // revalidate every 60 seconds
        const admindatafromserver:{admins:AdminModelType[]} = await response.json()
        return admindatafromserver;
    }

    const admindatafromserver = await fetchAdmins();
    const fetchSecretsFromServer = async() => {

        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/secret`,{next:{ revalidate:60}}) // revalidate every 60 seconds
        const secretsFromServer:{secrets:Array<{secret: string, _id: string}>} = await response.json()
        console.log(secretsFromServer)
        return secretsFromServer;
    }

    const secretsFromServer = await fetchSecretsFromServer();



    

    return (
        <div className='superadminlayout border-4 bg-slate-900/50 border-green-500 w-full' >
            <h1 className='text-center md:text-3xl font-bold text-cyan-200'>Master Admin Page</h1>
            <AdminTable admindatafromserver={admindatafromserver.admins}/>
            <SecretTable secrets = {secretsFromServer.secrets} eye={eye} hidden={hidden} />

            <Layout section='admin' />
            {children}
            <Confirmation />
            <LoaderSpinner color='#000000' />
        </div>
    )
}

export default layout
