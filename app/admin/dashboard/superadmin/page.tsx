import MemberForm from '@components/MemberForm'
import AdminTable from '@components/AdminTable'
import Link from 'next/link'
import SecretTable from '@components/SecretTable'
import RoscaList from '@components/RoscaList'
import { noto_serif_malayalam } from '@fonts'





const Dashboard = () => {

  return (
    <div className={`superadmin-main ${noto_serif_malayalam.className} relative`}>
      <RoscaList />
      <AdminTable />
      <SecretTable />
      <MemberForm />
    </div>
  )

}

export default Dashboard
