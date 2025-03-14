import '@app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
// import { useStore } from '@src/store'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className={`member-container flex flex-col items-center relative h-full '$'{(FormVisibility || deletePopupVisibility) && ' overflow-x-hidden overflow-y-hidden '}`}>
      <MemberTable />
      <MemberForm />
    </div>
  )

}

export default Dashboard
