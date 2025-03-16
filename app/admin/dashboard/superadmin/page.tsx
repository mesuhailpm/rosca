import MemberForm from '@components/MemberForm'
import AdminTable from '@components/AdminTable'
import Link from 'next/link'
import SecretTable from '@components/SecretTable'
import eye from 'public/assets/images/eye.svg'
import hidden from 'public/assets/images/hide.svg'
import RoscaList from '@components/RoscaList'




const Dashboard = () => {

  return (
    <div className={`member-container flex flex-col items-center relative h-full '$'{(FormVisibility || deletePopupVisibility) && ' overflow-x-hidden overflow-y-hidden '}`}>
      <RoscaList />
      <AdminTable />
      <SecretTable eye={eye} hidden={hidden} />
      <MemberForm />
      <Link href={'/admin/dashboard/spin'} className='self-start'><h2 className="underline text-slate-100">Click me to Spin the wheel and draw someone</h2></Link>
    </div>
  )

}

export default Dashboard
