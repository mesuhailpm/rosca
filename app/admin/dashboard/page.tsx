import '@app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
// import { useStore } from '@src/store'
import Link from 'next/link'

const Dashboard = () => {




  return (
    <div className={`member-container flex flex-col items-center relative h-full '$'{(showFormModal || showDeleteModal) && ' overflow-x-hidden overflow-y-hidden '}`}>
      <MemberTable />
      <MemberForm />
      <Link href={'/admin/dashboard/spin'} className='self-start'><h2 className="underline text-slate-100">Click me to Spin the wheel and draw someone</h2></Link>
    </div>
  )

}

export default Dashboard
