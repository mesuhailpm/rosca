import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
// import { useStore } from '@src/store'
import Link from 'next/link'
import checkLoggedIn from '@utils/checkLoggedIn'

const Dashboard = () => {




  return (
    <div className={`member-container flex flex-col items-center relative h-full '$'{(showFormModal || showDeleteModal) && ' overflow-x-hidden overflow-y-hidden '}`}>
      { <MemberTable

      />}


        <MemberForm

          // action={action}

        />
          <LoaderSpinner color='#000000' />
      {/* )} */}

      {/* Popup for deletion*/}
      {/* <div
        className={`fixed w-screen h-screen modal ${showDeleteModal && 'appear'} top-0 left-0 flex items-center justify-center`}
      > */}
        <DeleteModal
        />
      {/* </div> */}

      {/* Pop up Alert after actions */}

      {
        // showConfirmation ? (
            <Confirmation
              // confirmationMessage={confirmationMessage}
            />
        // ) : <></>
      }

      {/* {!loading &&  */}
      <Link href={'/spin'} className='self-start'><h2 className="bg-yellow-500 text-2xl-text-violet-500">Click me to Spin the wheel and draw someone</h2>
      </Link>
      {/* } */}

    </div>
  )

}

export default Dashboard
