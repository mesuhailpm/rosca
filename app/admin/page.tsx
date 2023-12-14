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

      <div
        className={`memberform fixed w-screen h-full  top-0 left-0 flex items-center justify-center border boder4 border-black modal '$'{ showFormModal && 'appear'}`}
      >
        <MemberForm

          // action={action}

        />
      </div>
      {responseLoading && (
        <div className={`fixed w-screen h-screen border border-black loading top-0 right-0 flex justify-center items-center`}>
          <LoaderSpinner color='#000000' />
        </div>
      )}

      {/* Popup for deletion*/}
      <div
        className={`fixed w-screen h-screen modal ${showDeleteModal && 'appear'} top-0 left-0 flex items-center justify-center`}
      >
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          handleSubmit={handleSubmit}
          id={ideToDelete}
        />
      </div>

      {/* Pop up Alert after actions */}

      {
        showConfirmation ? (
          <div className='bg-sky-500/[.5] z-100 flex fixed h-screen w-screen top-0 left-0 items-center justify-center'>
            <Confirmation
              confirmationMessage={confirmationMessage}
            />
          </div>
        ) : <></>
      }

      {!loading && <Link href={'/spin'} className='self-start'><h2 className="bg-yellow-500 text-2xl-text-violet-500">Click me to Spin the wheel and draw someone</h2></Link>}

    </div>
  )

}

export default Dashboard
