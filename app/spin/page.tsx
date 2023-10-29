'use client'
import React, { useEffect, useState } from 'react'
import Wheel from '@components/Wheel'
import { participants as sampleParticipants } from '@data/sample'
const Spin = () => {
  const [participant, setParticipant] = useState<IndexState['participant']>('')
  const [participantData, setParticipantData] = useState<IndexState['participants']>([])
  const [participants, setParticipants] = useState<IndexState['participants']>([]);
  const [winnerToBeDeclared, setWinnerToBeDeclared] = useState<IndexState['winnerToBeDeclared']>('')
  const [loading, setLoading] = useState<IndexState['loading']>(true)



  interface IndexState {
    participant: string;
    participants: string[];
    winnerToBeDeclared: string;
    loading: boolean;
  }
  const onFinished = (winner: string) => setWinnerToBeDeclared(winner);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('/api/participants/all')
      const data = await response.json();
      const newArray = data?.allParticipants.map((participant: { name: string }) => participant.name)
      setParticipants(newArray)
    } catch (error) {
      console.log(error)
    }

  }
  const handleToken = async () => {
    try {
      const userObject = await JSON.parse(localStorage.getItem('userObject')||'')
      const {token} = userObject
      // const isTokenValid = await verifyToken(token)
      const response = await fetch('api/verifyToken',{method: 'POST', body: JSON.stringify(token)})
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
    fetchParticipants()
  }, [])
  // useEffect(() => {
  //   console.log(participants)

  // }, [participants])



  return (
    <>
      {loading ? (<>Loading...</>)
        :
        (<>

          <h1 className='font-bold text-3xl'>ROSCA Wheel</h1>

          {participants?.length && <Wheel
            segments={participants}
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