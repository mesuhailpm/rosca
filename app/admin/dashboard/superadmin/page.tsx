
'use client'
import '@app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
// import { useStore } from '@src/store'
import Link from 'next/link'
import AdminTable from '@components/AdminTable'
import SecretTable from '@components/SecretTable'
import { AdminModelType } from '@types'
import { useEffect, useState } from 'react'
import eye from 'public/assets/images/eye.svg'
import hidden from 'public/assets/images/hide.svg'


const Dashboard = () => {

  const [admindatafromserver, setadmindatafromserver] = useState<{ admins: AdminModelType[] }>()
  const [secretsFromServer, setsecretsFromServer] = useState<{ secrets: Array<{ secret: string, _id: string }> }>()

  const fetchAdmins = async () => {


    const response = await fetch(`/api/admin`, { next: { revalidate: 60 } }) // revalidate every 60 seconds
    const admindatafromserver: { admins: AdminModelType[] } = await response.json()
    setadmindatafromserver(admindatafromserver);
  }
  const fetchSecretsFromServer = async () => {


    const response = await fetch(`$/api/secret`, { next: { revalidate: 60 } }) // revalidate every 60 seconds
    const secretsFromServer: { secrets: Array<{ secret: string, _id: string }> } = await response.json()
    console.log(secretsFromServer)
    setsecretsFromServer(secretsFromServer);
  }



  useEffect(() => {
    fetchAdmins()
    fetchSecretsFromServer()
  }, [])






  return (
    <div className={`member-container flex flex-col items-center relative h-full '$'{(showFormModal || showDeleteModal) && ' overflow-x-hidden overflow-y-hidden '}`}>
      {admindatafromserver && <AdminTable admindatafromserver={admindatafromserver.admins} />}
      {secretsFromServer && <SecretTable secrets={secretsFromServer.secrets} eye={eye} hidden={hidden} />}
      <MemberTable />
      <MemberForm />
      <Link href={'/admin/dashboard/spin'} className='self-start'><h2 className="underline text-slate-100">Click me to Spin the wheel and draw someone</h2></Link>
    </div>
  )

}

export default Dashboard
