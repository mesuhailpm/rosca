'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Wheel from '@components/Wheel'
import { fetchAllParticipants, addParticipant, updateParticipant, deleteParticipant } from '@actions'
import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
import Confetti from 'react-confetti'
import { useStore } from '@src/store'

const Dashboard = () => {
  const [notClaimedParticipantNames, setNotClaimedParticipantNames] = useState<IndexState['notClaimedParticipantNames']>([])
  // const [participants, setParticipants] = useState<IndexState['participants']>([]); // array of objects
  const { participants } = useStore()
  const [winnerToBeDeclared, setWinnerToBeDeclared] = useState<IndexState['winnerToBeDeclared']>('')
  const [loading, setLoading] = useState<IndexState['loading']>(true)
  const [responseLoading, setResponseLoading] = useState<IndexState['loading']>(false)
  const [showWheel, setShowWheel] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [action, setAction] = useState('')
  const [ideToDelete, setIdToDelete] = useState('')
  const [showConfirmation, setShowCinfirmation] = useState(false);
  let [confirmationMessage, setconfirmationMessage] = useState({
    message: '',
    success: true,
  })
  const [isOnlyOnce, setIsOnlyOnce] = useState(true)

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

  const { isLoggedIn } = useStore()


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
          //console.logconfirmationMessage, ' is confirmationMessage');

          // //console.log'Got updataed data with message', dataWithMessage.result);

          const updatedArray = participants.map((participant: participant) => {
            // console.log(participant);
            return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
          })
          // setParticipants(updtedArray)
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

  const declareWinner = (winner: string) => {
    setWinnerToBeDeclared(winner)
    setTimeout(
      () => {
        setWinnerToBeDeclared('')
      }, 15000
    )

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

  const onFinished = (winner: string) => {
    setTimeout(() =>
      declareWinner(winner), 3000)
  };

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
      // console.log(decodedData, ' is decoded data from jsonwebtoken');
      // console.log(new Date());
      // console.log( new Date(decodedData.exp*1000).toLocaleString())
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
      //console.logconfirmationMessage);

      setShowCinfirmation(true);
      setShowDeleteModal(false)
      setShowFormModal(false)
      setTimeout(() => {
        setShowCinfirmation(false);
        setconfirmationMessage({
          message: '',
          success: false
        })
      }, 2000)
      //console.logconfirmationMessage, 'useEffect ran  is confirmation message');
    }

  }, [confirmationMessage.message])
  function shuffleArray(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  



  useEffect(() => {
    (async () => {
      const allParticipants = await fetchAllParticipants()
      allParticipants.sort((a: participant, b: participant) => a.serial - b.serial)
      useStore.setState({ participants: allParticipants });
      // setParticipants(allParticipants)
    })()
  }, [])
  useEffect(() => {
    const notClaimedParticipantNames = participants.filter((participant: participant) => !participant.claimed).map((participant: participant) => participant.name)
    const randomisedParticipants = shuffleArray(notClaimedParticipantNames)
    setNotClaimedParticipantNames(randomisedParticipants)
  }, [participants])


  if (showWheel) return loading ? (<>Loading...</>)
    : (
      <div className='w-full flex flex-col items-center justify-between '>

        <h1 className="m-4 font-bold text-3xl" style={{ textShadow: 'rgb(209, 195, 172) 4px 0px 0px, rgb(209, 195, 172) 3.87565px 0.989616px 0px, rgb(209, 195, 172) 3.51033px 1.9177px 0px, rgb(209, 195, 172) 2.92676px 2.72656px 0px, rgb(209, 195, 172) 2.16121px 3.36588px 0px, rgb(209, 195, 172) 1.26129px 3.79594px 0px, rgb(209, 195, 172) 0.282949px 3.98998px 0px, rgb(209, 195, 172) -0.712984px 3.93594px 0px, rgb(209, 195, 172) -1.66459px 3.63719px 0px, rgb(209, 195, 172) -2.51269px 3.11229px 0px, rgb(209, 195, 172) -3.20457px 2.39389px 0px, rgb(209, 195, 172) -3.69721px 1.52664px 0px, rgb(209, 195, 172) -3.95997px 0.56448px 0px, rgb(209, 195, 172) -3.97652px -0.432781px 0px, rgb(209, 195, 172) -3.74583px -1.40313px 0px, rgb(209, 195, 172) -3.28224px -2.28625px 0px, rgb(209, 195, 172) -2.61457px -3.02721px 0px, rgb(209, 195, 172) -1.78435px -3.57996px 0px, rgb(209, 195, 172) -0.843183px -3.91012px 0px, rgb(209, 195, 172) 0.150409px -3.99717px 0px, rgb(209, 195, 172) 1.13465px -3.8357px 0px, rgb(209, 195, 172) 2.04834px -3.43574px 0px, rgb(209, 195, 172) 2.83468px -2.82216px 0px, rgb(209, 195, 172) 3.44477px -2.03312px 0px, rgb(209, 195, 172) 3.84068px -1.11766px 0px, rgb(209, 195, 172) 3.9978px -0.132717px 0px' }}>ഇത് നമ്മുടെ കുറി</h1>
        <h1 className='m-4' style={{ textShadow: 'rgb(43, 191, 255) 4px 0px 0px, rgb(43, 191, 255) 3.87565px 0.989616px 0px, rgb(43, 191, 255) 3.51033px 1.9177px 0px, rgb(43, 191, 255) 2.92676px 2.72656px 0px, rgb(43, 191, 255) 2.16121px 3.36588px 0px, rgb(43, 191, 255) 1.26129px 3.79594px 0px, rgb(43, 191, 255) 0.282949px 3.98998px 0px, rgb(43, 191, 255) -0.712984px 3.93594px 0px, rgb(43, 191, 255) -1.66459px 3.63719px 0px, rgb(43, 191, 255) -2.51269px 3.11229px 0px, rgb(43, 191, 255) -3.20457px 2.39389px 0px, rgb(43, 191, 255) -3.69721px 1.52664px 0px, rgb(43, 191, 255) -3.95997px 0.56448px 0px, rgb(43, 191, 255) -3.97652px -0.432781px 0px, rgb(43, 191, 255) -3.74583px -1.40313px 0px, rgb(43, 191, 255) -3.28224px -2.28625px 0px, rgb(43, 191, 255) -2.61457px -3.02721px 0px, rgb(43, 191, 255) -1.78435px -3.57996px 0px, rgb(43, 191, 255) -0.843183px -3.91012px 0px, rgb(43, 191, 255) 0.150409px -3.99717px 0px, rgb(43, 191, 255) 1.13465px -3.8357px 0px, rgb(43, 191, 255) 2.04834px -3.43574px 0px, rgb(43, 191, 255) 2.83468px -2.82216px 0px, rgb(43, 191, 255) 3.44477px -2.03312px 0px, rgb(43, 191, 255) 3.84068px -1.11766px 0px, rgb(43, 191, 255) 3.9978px -0.132717px 0px' }}>{`Can be spinned ${isOnlyOnce ? 'once' : 'multiple times'}`}</h1>
        <div className='m-10 flex flex-col items-center bg-white p-2'><h1 className='text-pink-500'>Switch</h1><button className={` p-2 hover:font-bold rounded-md ${isOnlyOnce ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}`} onClick={() => setIsOnlyOnce(prev => !prev)}> {`${isOnlyOnce ? 'Limited' : 'Free'}`} </button></div>

        

        
        {!loading && <button className='max-w-[500px] m-4 p-2 bg-teal-500 rounded-xl text-rose-900' onClick={() => setShowWheel((prev) => !prev)}>{`Click Me to ${showWheel ? 'Hide' : 'Show'} the Spinning wheel`}</button>}

      </div>
    )

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
      {/* )} */}

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







    </div>
  )

}

export default Dashboard
