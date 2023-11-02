'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Wheel from '@components/Wheel'
import { participants as sampleParticipants } from '@data/sample'
import { fetchAllParticipants, addParticipant, updateParticipant, deleteParticipant } from '@actions'
import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
import Confirmation from '@components/Confirmation'
import MemberTable from '@components/MemberTable'
const Spin = () => {
  // const [participant, setParticipant] = useState<IndexState['participant']>('')
  const [participantNames, setParticipantNames] = useState<IndexState['participantNames']>([])
  const [participants, setParticipants] = useState<IndexState['participants']>([]); // array of objects
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
    message:'',
    success: true,
  })
  const [isOnlyOnce, setIsOnlyOnce] = useState(true)
  // console.log(responseLoading, ' is loading component');


  const toggleDeleteModal = () => setShowDeleteModal((prev) => !prev)

  const edit = 'edit'
  const add = 'add'
  const remove = 'remove'
  const initialFomData: IndexState['formData'] = {
    _id: '',
    serial: NaN,
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
    console.log(serial, name, claimed, ' from handleEdit')
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
  // console.log(participants, ' are participants');
  const [showForm, setShowForm] = useState(false)
  // console.log(participantNames);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }
  const hanldeAdd = () => {
    setShowForm(true)
    setFormData(initialFomData)
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>, action: string, _id: string, formData: IndexState['formData']) => {
    if (e) e.preventDefault()
    console.log(action, _id, 'is id', formData, ' is formData');
    try {
      switch (action) {
        case edit:
          console.log('action is edit and the id is ', _id)
          setResponseLoading(true)
          const dataWithMessage = await updateParticipant(_id, JSON.stringify(formData))
          setconfirmationMessage({
            message: dataWithMessage.message,
            success: true
          }
            )
          console.log(confirmationMessage, ' is confirmationMessage');

          // console.log('Got updataed data with message', dataWithMessage.result);

          const updtedArray = participants.map((participant) => {
            // console.log(participant);

            return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
          })
          setParticipants(updtedArray)
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
          setParticipants(participantCopy)
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
          if(deletedParticipant === undefined) throw new Error()


          setParticipants((prev) => {
            return prev.filter((participant) => participant._id !== deletedParticipant._id)
          })
          toggleDeleteModal()
          setResponseLoading(false)
          break

        default:
          setResponseLoading(false)
          console.log('this is default action');

          break;
      }
    } catch (error) {

      console.log(error, ' hanlde sumit failed nwith confirm message object',confirmationMessage)

      setResponseLoading(false)
      setconfirmationMessage((prev)=>(
        {...prev, success: false}
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
    participantNames: string[];
    winnerToBeDeclared: string;
    loading: boolean;
    formData: {
      _id: string;
      serial: number;
      name: string;
      claimed: boolean;
    }
  }

  const onFinished = (winner: string) => setWinnerToBeDeclared(winner);

  // const fetchParticipants = async () => {
  //   try {
  //     const response = await fetch('/api/participants/all')
  //     const data = await response.json();
  //     const newArray = data?.allParticipants.map((participant: { name: string }) => participant.name)
  //     setParticipants(newArray)
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  const handleToken = async () => {
    try {
      const userObject = await JSON.parse(localStorage.getItem('userObject') || '')
      const { token } = userObject
      // const isTokenValid = await verifyToken(token)
      const response = await fetch('api/verifyToken', { method: 'POST', body: JSON.stringify(token) })
      const decodedData = await response.json()
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
  }, [])

  useEffect(() => {
    if (confirmationMessage.message) {
      console.log(confirmationMessage);

      setShowCinfirmation(true);
      setShowDeleteModal(false)
      setShowFormModal(false)
      setTimeout(() => {
        setShowCinfirmation(false);
        setconfirmationMessage ({
          message: '',
          success: false
        })
      }, 2000)

      console.log(confirmationMessage, 'useEffect ran  is confirmation message');

    }

  }, [confirmationMessage.message])


  useEffect(() => {
    (async () => {

      const allParticipants = await fetchAllParticipants()
      setParticipants(allParticipants)
    })()
  }, [])
  useEffect(() => {
    const participantNames = participants.map((participant) => participant.name)
    setParticipantNames(participantNames)
  }, [participants])
  // useEffect(() => {
  //   console.log(participants)

  // }, [participants])
  return (
    <div className='flex flex-col p-5'>
      <MemberTable
        participants = {participants}
        handleEdit= {handleEdit}
        handleDelete={handleDelete}
        toggleFormModal={toggleFormModal}

      />
      {!loading && <button className='m-4 p-2 bg-teal-500 rounded-xl text-rose-900' onClick={()=>setShowWheel(true)}>{`Click Me to ${showWheel ? 'Hide': 'Show'} the Spinning wheel`}</button>}

      {/* {showFormModal && ( */}
      <div
        className={`absolute w-screen h-screen top-0 flex items-center justify-center modal ${showFormModal && 'appear'}`}
      >
        <MemberForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          title={'Add'}
          formData={formData}
          toggleFormModal={toggleFormModal}
          action={action}
          loading={loading}

        />
      </div>
      {/* )
      } */}

      {responseLoading && (
        <div className={`absolute w-screen h-screen border border-black loading top-0 right-0 flex justify-center items-center`}>
          <LoaderSpinner />
        </div>
      )}



      {/* {showDeleteModal && ( */}
      <div
        className={`absolute w-screen h-screen modal ${showDeleteModal && 'appear'} top-0 flex items-center justify-center`}
      >
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          handleSubmit={handleSubmit}
          id={ideToDelete}
        />
      </div>
      {/* )} */}

      {
        showConfirmation ? (
          <div className='bg-sky-500/[.5] z-100 flex absolute h-screen w-screen top-0 left-0 items-center justify-center'>

            <Confirmation
              confirmationMessage={confirmationMessage}
            />
          </div>
        ) : <></>
      }


      {showWheel && (
        loading ? (<>Loading...</>)
          : (
            <>

              <h1 className='font-bold text-3xl'>ROSCA Wheel</h1>


              {participantNames?.length && <Wheel
                segments={participantNames}
                segColors={['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000', '#FF9E80', '#00FF00', '#0000FF', '#800080', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#FFFFFF', '#000000', '#808080', '#FF0000', '#00FF00']}
                onFinished={(winner) => onFinished(winner)}
                isOnlyOnce={isOnlyOnce}
              />}

              {winnerToBeDeclared ?
                <h1 className='text-bold text-3xl text-green-900'>{`Congratulations ${winnerToBeDeclared} `}</h1>
                :
                <>Result will be here</>}
            </>
          )




      )
      }
    </div>
  )


}

export default Spin
