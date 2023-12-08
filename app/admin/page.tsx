'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { fetchAllParticipants, addParticipant, updateParticipant, deleteParticipant } from '@actions'
import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
import { useStore } from '@src/store'
import Link from 'next/link'

const Dashboard = () => {
  const [notClaimedParticipantNames, setNotClaimedParticipantNames] = useState<IndexState['notClaimedParticipantNames']>([])
  // const [participants, setParticipants] = useState<IndexState['participants']>([]); // array of objects
  const { participants } = useStore()
  const [loading, setLoading] = useState<IndexState['loading']>(true)
  const [responseLoading, setResponseLoading] = useState<IndexState['loading']>(false)
  const [showWheel, setShowWheel] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [action, setAction] = useState('')
  const [ideToDelete, setIdToDelete] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false);
  let [confirmationMessage, setconfirmationMessage] = useState({
    message: '',
    success: true,
  })

  const toggleDeleteModal = () => setShowDeleteModal((prev) => !prev)
  const edit = 'edit'
  const add = 'add'
  const remove = 'remove'
  const initialFomData: IndexState['formData'] = {
    _id: '',
    serial: 0,
    name: '',
    claimed: false

  }
  const toggleFormModal = (action: string) => {
    setShowFormModal((prev) => !prev)
    setFormData(initialFomData)
    if (!showFormModal) { setAction(action) }//setAction when closing modal is causing error ' object can't be react child'

  }

  const [formData, setFormData] = useState<IndexState['formData']>(initialFomData)

  const handleEdit = async (serial: number, name: string, claimed: boolean, action: string, _id: string) => {
    //console.logserial, name, claimed, ' from handleEdit')
    toggleFormModal(action)
    setFormData({
      _id,
      serial,
      name,
      claimed

    })
  }

  const handleDelete = (id: string) => {
    setIdToDelete(id)
    toggleDeleteModal()
  }
  // //console.logparticipants, ' are participants');
  const [showForm, setShowForm] = useState(false)
  // //console.lognotClaimedParticipantNames);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const { isLoggedIn }: any = useStore()


  const handleSubmit = async (e: FormEvent<HTMLFormElement>, action: string, _id: string, formData: IndexState['formData']) => {
    if (e) e.preventDefault()
    //console.logaction, _id, 'is id', formData, ' is formData');
    try {
      switch (action) {
        case edit:
          //console.log'action is edit and the id is ', _id)
          setResponseLoading(true)
          const dataWithMessage = await updateParticipant(_id, JSON.stringify(formData))
          setconfirmationMessage({
            message: dataWithMessage.message,
            success: true
          }
          )

          const updatedArray = participants.map((participant: participant) => {
            return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
          })
          useStore.setState({ participants: updatedArray })
          setResponseLoading(false)
          break;
        case add:
          setResponseLoading(true)
          const dataWIthMessage = await addParticipant(formData)
          setconfirmationMessage({
            message: dataWIthMessage.message,
            success: true
          })
          const participantCopy = participants
          participantCopy.push(dataWIthMessage.result)
          // setParticipants(participantCopy)
          useStore.setState(participantCopy)
          setResponseLoading(false)
          break;

        case remove:
          setResponseLoading(true)
          const dataAndMessage = await deleteParticipant(_id)
          setconfirmationMessage({
            message: dataAndMessage.message,
            success: true
          })
          const deletedParticipant = dataAndMessage.result
          if (deletedParticipant === undefined) throw new Error()
          // setParticipants((prev) => {
          //   return prev.filter((participant) => participant._id !== deletedParticipant._id)
          // })
          useStore.setState({ participants: participants.filter((participant: participant) => participant._id !== deletedParticipant._id) })
          toggleDeleteModal()
          setResponseLoading(false)
          break
        default:
          setResponseLoading(false)
          //console.log'this is default action');
          break;
      }
    } catch (error) {
      //console.logerror, ' hanlde sumit failed nwith confirm message object', confirmationMessage)
      setResponseLoading(false)
      setconfirmationMessage((prev) => (
        { ...prev, success: false }
      ))
    }
  }



  interface participant {
    _id: string,
    name: string,
    serial: number,
    claimed: boolean,

  }
  interface IndexState {
    participant: {};
    participants: participant[];
    notClaimedParticipantNames: string[];
    winnerToBeDeclared: string;
    loading: boolean;
    formData: {
      _id: string;
      serial: number;
      name: string;
      claimed: boolean;
    }
  }


  const handleToken = async () => {
    try {
      const userObject = await JSON.parse(localStorage.getItem('userObject') || '')
      const { token } = userObject
      // const isTokenValid = await verifyToken(tok en)
      const response = await fetch('api/verifyToken', { method: 'POST', body: JSON.stringify(token) })
      const decodedData = await response.json()
      if (!response.ok) {
        setTimeout(() => {
          localStorage.removeItem('userObject')
          location.href = '/';
        }, 100)
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        location.href = '/';
      }, 1000);
    }
  }
  useEffect(() => {
    handleToken()
  }, [isLoggedIn])

  useEffect(() => {
    if (confirmationMessage.message) {
      setShowConfirmation(true);
      setShowDeleteModal(false); setShowFormModal(false)
      setTimeout(() => {
        setShowConfirmation(false);
        setconfirmationMessage({
          message: '',
          success: false
        })
      }, 2000)
      //console.logconfirmationMessage, 'useEffect ran  is confirmation message');
    }

  }, [confirmationMessage.message])

  




  useEffect(() => {
    (async () => {
      const allParticipants = await fetchAllParticipants()
      allParticipants.sort((a: participant, b: participant) => a.serial - b.serial)
      useStore.setState({ participants: allParticipants });
      // setParticipants(allParticipants)
    })()
  }, [])


  return (
    <div className={`member-container relative h-full ${(showFormModal || showDeleteModal) && 'overflow-x-hidden overflow-y-hidden'}`}>
      <MemberTable
        participants={participants}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleFormModal={toggleFormModal}
        loading={loading}

      />
      {!loading && <button className='max-w-[500px] m-4 p-2 bg-teal-500 rounded-xl text-rose-900' onClick={() => setShowWheel((prev) => !prev)}>{`Click Me to ${showWheel ? 'Hide' : 'Show'} the Spinning wheel`}</button>}

      <div
        className={`memberform fixed w-screen h-full  top-0 left-0 flex items-center justify-center border boder4 border-black modal ${showFormModal && 'appear'}`}
      >
        <MemberForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          toggleFormModal={toggleFormModal}
          action={action}

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

      <Link href={'/spin'}><h2 className="text-2xl-text-violet-500">Click me to Spin the wheel and draw someone</h2></Link>

    </div>
  )

}

export default Dashboard
