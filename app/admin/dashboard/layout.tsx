import Confirmation from '@components/Confirmation'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Layout from '@components/Layout'


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
