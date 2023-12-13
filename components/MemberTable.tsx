'use client'
import { useStore } from '@src/store';
import { fetchAllParticipants, addParticipant, updateParticipant, deleteParticipant } from '@actions'


import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'


const MemberTable = ({}) => {
  const [loading, setLoading] = useState<IndexState['loading']>(true)
  const [responseLoading, setResponseLoading] = useState<IndexState['loading']>(false)
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









  const handleToken = async () => {

    const hasLoggedIn = await checkLoggedIn(setLoading)
    if (!hasLoggedIn) {

      localStorage.removeItem('userObject')
      location.href = '/admin/login';
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
    }

  }, [confirmationMessage.message])






  useEffect(() => {
    (async () => {
      setLoading(true)
      const allParticipants = await fetchAllParticipants()
      allParticipants.sort((a: participant, b: participant) => a.serial - b.serial)
      useStore.setState({ participants: allParticipants });
      setLoading(false)

    })()
  }, [])


    const { participants } = useStore()

    const add = 'add'
    const edit = 'edit'

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
    return (<table className='max-w-lg bg-slate-700 w-full table-auto'>
            <thead>
                <tr className='bg-blue-900 text-white'>
                    <td>Sl No</td>
                    <td>Name</td>
                    <td>Claimed</td>
                    <td colSpan={2}>Action</td>
                </tr>
            </thead>
            <tbody>
                {participants?.map((participant, index) => {
                    const { serial, name, claimed, _id } = participant
                    return (
                        <tr key={index} className={`${!(index % 2) ? 'bg-sky-500 text-teal-100' :'text-slate-200'}`}>
                            <td>{serial}</td>
                            <td>{name}</td>
                            <td>{claimed === true ? 'Yes' : 'No'}</td>
                            <td className='hover:text-yellow-500'><button onClick={() => handleEdit(serial, name, claimed, edit, _id)}><i className="fas fa-edit"></i></button></td>
                            <td className='hover:text-red-500'><button onClick={() => handleDelete(_id)}><i className="fa-solid fa-trash"></i></button></td>
                        </tr>)
                }
                )
                }
                <tr className='bg-purple-500'><td colSpan={5} align='center'><button className='p-2 pr-4 pl-4 rounded-md bg-green-800 text-yellow-100 hover:text-green-500' onClick={() => toggleFormModal(add)}>Want to add a member? click here</button></td></tr>
            </tbody>

        </table>)
        }




export default MemberTable;
