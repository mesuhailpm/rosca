'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Wheel from '@components/Wheel'
import { participants as sampleParticipants } from '@data/sample'
import { fetchAllParticipants, addParticipant, updateParticipant } from '@actions'
import '../../app/globals.css'
import MemberForm from '@components/MemberForm'
const Spin = () => {
  const [participant, setParticipant] = useState<IndexState['participant']>('')
  const [participantNames, setParticipantNames] = useState<IndexState['participantNames']>([])
  const [participants, setParticipants] = useState<IndexState['participants']>([]); // array of objects
  const [winnerToBeDeclared, setWinnerToBeDeclared] = useState<IndexState['winnerToBeDeclared']>('')
  const [loading, setLoading] = useState<IndexState['loading']>(true)
  const [showWheel, setShowWheel] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState('')
  const edit = 'edit'
  const add = 'add'
  const remove = 'remove'
  const initialFomData: IndexState['formData'] = {
    _id:'',
    serial: NaN,
    name: '',
    claimed: false

  }
  const toggleModal = ( action: string) => {
    setFormData(initialFomData)
    setAction(action)
    setShowModal((prev) => !prev)

  }

  const [formData, setFormData] = useState<IndexState['formData']>(initialFomData)

  const handleEdit = async (serial: number, name: string, claimed: boolean, action: string, _id:string) => {
    console.log(serial, name, claimed, ' from handleEdit')
    toggleModal(action)
    setFormData({
      _id,
      serial,
      name,
      claimed

    })
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

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>, action: string, _id:string, formData:IndexState['formData']) => {
    e.preventDefault()
    console.log(action, _id,'is id', formData, ' is formData');
    try {
      switch (action) {
        case edit:
          console.log('action is edit and the id is ',_id)
          const dataWithMessage = await updateParticipant(_id, JSON.stringify(formData))
          console.log('Got updataed data with message',dataWithMessage.data );
          
          const updtedArray = participants.map((participant) => {
            console.log(participant);
            
            return participant._id === dataWithMessage.data._id ? dataWithMessage.data : participant
          })
          setParticipants(updtedArray)

          break;
        case add:
          await addParticipant(formData)

          break

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
      _id:string;
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
    <>{participants.length ?
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
          {participants.map((participant: {_id:string, serial: number, name: string, claimed: boolean }, index) => {
            const { serial, name, claimed,_id } = participant
            return (
              <tr key={index}>
                <td>{serial}</td>
                <td>{name}</td>
                <td>{claimed === true ? 'Yes': 'No'}</td>
                <td><button onClick={() => handleEdit(serial, name, claimed, edit, _id)}>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>)
          }
          )
          }
          <tr><td colSpan={5} align='center'><button onClick={(e) => toggleModal(add)}>Add a member</button></td></tr>
        </tbody>

      </table>)
      : (
        <h1>No Members</h1>

      )}
      {showModal && (
        <div
          className='absolute w-screen h-screen modal dbg-slate-400 top-0 flex items-center justify-center'
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
      )
      }

    </>
  )


  if (!showWheel) return (
    <>
      {loading ? (<>Loading...</>)
        :
        (<>

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

        )}
    </>
  )
}

export default Spin
