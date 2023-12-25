'use client'
import { useStore } from '@src/store';
import { useState, useEffect } from 'react'
import { fetchAllParticipants } from '@actions';
import tickIcon from 'public/assets/images/tick.svg'
import crossIcon from 'public/assets/images/cross.svg'
import Image from 'next/image';
import { Participants, State } from '@types';




export default function MainTable() {
  const { participants, setParticipants } = useStore() as State

  const [loading, setLoading] = useState(true)
  const setParticipantsForStore = async () => {
    try {

      const data: Participants = await fetchAllParticipants()
      data.sort((a, b) => a.serial - b.serial)

      setParticipants(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }




  useEffect(() => {
    setParticipantsForStore()
    console.log('useEffect ran');

  }, [])
  if (loading) return <h1 className="text-2xl text-white">Loading...</h1>

  return (
    <div>
      {participants?.length > 0 ? (
        <table className="md:self-start m-4 bg-[#96ffff] text-slate-950 border border-black table-auto font-raleway">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Claimed</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participantObject, index) => (
              <tr key={index} className={`${index % 2 === 1 ? '' : 'bg-green-400'}`}>
                <td>{participantObject.serial}</td>
                <td>{participantObject.name}</td>
                <td><Image width={16} src={participantObject.claimed ? tickIcon : crossIcon} alt="yes/no-icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) :
        (<h1 className="text-xxl uppercase">No Participants to Show</h1>)
      }


    </div>)


}
