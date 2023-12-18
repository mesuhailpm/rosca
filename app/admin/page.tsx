import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
// import { useStore } from '@src/store'
import Link from 'next/link'
import checkLoggedIn from '@utils/checkLoggedIn'

const Dashboard = () => {




  return (
    <div className={`member-container flex flex-col items-center relative h-full '$'{(showFormModal || showDeleteModal) && ' overflow-x-hidden overflow-y-hidden '}`}>
      <MemberTable/>
      <MemberForm/>


      {/* {!loading &&  */}
      <Link href={'/spin'} className='self-start'><h2 className="bg-yellow-500 text-2xl-text-violet-500">Click me to Spin the wheel and draw someone</h2>
      </Link>
      {/* } */}

    </div>
  )

}

export default Dashboard
