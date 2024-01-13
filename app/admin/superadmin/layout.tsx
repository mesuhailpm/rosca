import Confirmation from '@components/Confirmation'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Layout from '@components/Layout'
import AdminTable from '@components/AdminTable'
import { AdminModelType } from '@types'

console.log()
const layout = async ({ children, req }: { children: React.ReactNode,req:any}) => {

    console.log(process.env.NEXT_PUBLIC_SITE_URL, ' is base URL')

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin`,{next:{ revalidate:60}}) // revalidate every 60 seconds
    const admindatafromserver:{admins:AdminModelType[]} = await response.json()

    return (
        <div>
            <AdminTable admindatafromserver={admindatafromserver.admins}/>
            <Layout section='admin' />
            {children}
            <Confirmation />
            <LoaderSpinner color='#000000' />
        </div>
    )
}

export default layout
