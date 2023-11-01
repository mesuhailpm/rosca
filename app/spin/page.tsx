'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Wheel from '@components/Wheel'
import { participants as sampleParticipants } from '@data/sample'
import { fetchAllParticipants, addParticipant, updateParticipant, deleteParticipant } from '@actions'
import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
import DeleteModal from '@components/DeleteModal'
import LoaderSpinner from '@components/Spinner'
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
  const toggleModal = (action: string) => {
    setShowFormModal((prev) => !prev)
    setFormData(initialFomData)
    setAction(action)

  }

  const [formData, setFormData] = useState<IndexState['formData']>(initialFomData)

  const handleEdit = async (serial: number, name: string, claimed: boolean, action: string, _id: string) => {
    console.log(serial, name, claimed, ' from handleEdit')
    toggleModal(action)
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
  console.log(participants, ' are participants');
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
          console.log('Got updataed data with message', dataWithMessage.result);

          const updtedArray = participants.map((participant) => {
            // console.log(participant);

            return participant._id === dataWithMessage.result._id ? dataWithMessage.result : participant
          })
          setParticipants(updtedArray)
          setResponseLoading(false)

          break;
        case add:
          const dataWIthMessage = await addParticipant(formData)
          const participantCopy = participants
          participantCopy.push(dataWIthMessage.result)
          setParticipants(participantCopy)

          break

        case remove:
          const response = await deleteParticipant(_id)
          setParticipants((prev) => {
            return prev.filter((participant) => participant._id !== _id)
          })
          toggleDeleteModal()

        default:
          console.log('this is default action');

          break;
      }
    } catch (error) {
      console.log(error)

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
    <>
      {participants.length ?
        (<table className='bg-slate-500'>
          <thead>
            <tr>
              <td>Serial Number</td>
              <td>Name</td>
              <td>Status</td>
              <td colSpan={2}>Action</td>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant: { _id: string, serial: number, name: string, claimed: boolean }, index) => {
              const { serial, name, claimed, _id } = participant
              return (
                <tr key={index}>
                  <td>{serial}</td>
                  <td>{name}</td>
                  <td>{claimed === true ? 'Yes' : 'No'}</td>
                  <td><button onClick={() => handleEdit(serial, name, claimed, edit, _id)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(_id)}>Delete</button></td>
                </tr>)
            }
            )
            }
            <tr><td colSpan={5} align='center'><button onClick={() => toggleModal(add)}>Add a member</button></td></tr>
          </tbody>

        </table>)
        : (
          !loading ?( <h1>No Members</h1>)
          :(
            <h1>Loading...</h1>
          )


        )}
      {/* {showFormModal && ( */}
        <div
          className={`absolute w-screen h-screen top-0 flex items-center justify-center modal ${showFormModal && 'appear'}`}
        >
          <MemberForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            title={'Add'}
            formData={formData}
            toggleModal={toggleModal}
            action={action}

          />
        </div>
      {/* )
      } */}

      {responseLoading && (
        <div className='absolute w-screen h-screen border border-black modal top-0 right-0 flex justify-center items-center'>
          <LoaderSpinner />
        </div>
      )}



      {showDeleteModal && (
        <div
          className='absolute w-screen h-screen modal dbg-slate-400 top-0 flex items-center justify-center'
        >
          <DeleteModal
            toggleDeleteModal={toggleDeleteModal}
            handleSubmit={handleSubmit}
            id={ideToDelete}
          />
        </div>
      )}




      {showWheel && (
        loading ? (<>Loading...</>)
          : (
            <>

              <h1 className='font-bold text-3xl'>ROSCA Wheel</h1>

              {participantNames?.length && <Wheel
                segments={participantNames}
                segColors={['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000', '#FF9E80', '#00FF00', '#0000FF', '#800080', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#FFFFFF', '#000000', '#808080', '#FF0000', '#00FF00']}
                onFinished={(winner) => onFinished(winner)}
              />}

              {winnerToBeDeclared ?
                <h1 className='text-bold text-3xl text-green-900'>{`Congratulations ${winnerToBeDeclared} `}</h1>
                :
                <>Result will be here</>}
            </>
          )




      )
      }
    </>
  )


}

export default Spin
