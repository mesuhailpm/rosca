'use client'
import {useStore} from '@src/store';
import {useState, useEffect } from 'react'
import { fetchAllParticipants } from '@actions';
import tickIcon from 'public/assets/images/tick.svg'
import crossIcon from 'public/assets/images/cross.svg'
import Image from 'next/image';
import { useContext } from 'react';
import DataContext from '../app/Proivder'




export default function MainTable(props) {
  // const {participants, setParticipants} = useStore()
  const data = useContext(DataContext); // DataContext refers to the context provided by the Provider

  const[loading, setLoading] = useState(true)
  console.log(useStore())
  console.log(props, ' is props');
  console.log(data)





  // useEffect(()=>{
  //   fetchParticipants()
  // },[])

    return(
    <div>
        {data?.length > 0 ? (
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
      ):
              loading ? (
                <h1 className="text-2xl text-white">Loading...</h1>

              ):
              (
                <h1 className="text-xxl uppercase">No Participants to Show</h1>
              )
      }


    </div>)


}
