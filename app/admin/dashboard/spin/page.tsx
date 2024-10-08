'use client'
import React, { useEffect, useState } from 'react'
import Wheel from '@components/Wheel'
import { fetchAllParticipants } from '@actions'
import '@app/globals.css'
import Confetti from 'react-confetti'
import { useStore } from '@src/store'
import { Participants } from '@types'
import { noto_serif_malayalam } from '@fonts'

const Spin = () => {
  const [notClaimedParticipantNames, setNotClaimedParticipantNames] = useState<string[]>([])
  const { participants, isLoggedIn, setParticipants } = useStore()
  const [winnerToBeDeclared, setWinnerToBeDeclared] = useState<string>('')//ഹിബ ഷെറിൻ പൂക്കോട്ടുംപാടം.


  const declareWinner = (winner: string) => {
    setWinnerToBeDeclared(winner)
    setTimeout(
      () => {
        setWinnerToBeDeclared('')
      }, 10000
    )
  }



  const onFinished = (winner: string) => {
    setTimeout(() =>
      declareWinner(winner), 3000)
  };



  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }




  useEffect(() => {
    (async () => {
      const allParticipants: Participants = await fetchAllParticipants()
      allParticipants.sort((a, b) => a.serial - b.serial)
      setParticipants(allParticipants);
    })()
  }, [])
  useEffect(() => {
    const notClaimedParticipantNames = participants.filter((participant) => !participant.claimed).map((participant) => participant.name)
    const randomisedParticipants = shuffleArray(notClaimedParticipantNames)
    setNotClaimedParticipantNames(randomisedParticipants)
  }, [participants])



  return (
    <div className='w-full flex flex-col items-center justify-between '>

      <h1 className="m-4 font-bold text-3xl" style={{ textShadow: 'rgb(209, 195, 172) 4px 0px 0px, rgb(209, 195, 172) 3.87565px 0.989616px 0px, rgb(209, 195, 172) 3.51033px 1.9177px 0px, rgb(209, 195, 172) 2.92676px 2.72656px 0px, rgb(209, 195, 172) 2.16121px 3.36588px 0px, rgb(209, 195, 172) 1.26129px 3.79594px 0px, rgb(209, 195, 172) 0.282949px 3.98998px 0px, rgb(209, 195, 172) -0.712984px 3.93594px 0px, rgb(209, 195, 172) -1.66459px 3.63719px 0px, rgb(209, 195, 172) -2.51269px 3.11229px 0px, rgb(209, 195, 172) -3.20457px 2.39389px 0px, rgb(209, 195, 172) -3.69721px 1.52664px 0px, rgb(209, 195, 172) -3.95997px 0.56448px 0px, rgb(209, 195, 172) -3.97652px -0.432781px 0px, rgb(209, 195, 172) -3.74583px -1.40313px 0px, rgb(209, 195, 172) -3.28224px -2.28625px 0px, rgb(209, 195, 172) -2.61457px -3.02721px 0px, rgb(209, 195, 172) -1.78435px -3.57996px 0px, rgb(209, 195, 172) -0.843183px -3.91012px 0px, rgb(209, 195, 172) 0.150409px -3.99717px 0px, rgb(209, 195, 172) 1.13465px -3.8357px 0px, rgb(209, 195, 172) 2.04834px -3.43574px 0px, rgb(209, 195, 172) 2.83468px -2.82216px 0px, rgb(209, 195, 172) 3.44477px -2.03312px 0px, rgb(209, 195, 172) 3.84068px -1.11766px 0px, rgb(209, 195, 172) 3.9978px -0.132717px 0px' }}>ഇത് നമ്മുടെ കുറി</h1>

      {notClaimedParticipantNames?.length &&
        <div className='hover:cursor-pointer m-1'>
          <Wheel
            segments={notClaimedParticipantNames}
            segColors={['#EE4040', '#F8CF50', '#815CD1', '#3DA5E0', '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9050', '#FF9E80', '#00FF00', '#0000FF', '#800080', '#F0F808', '#00FFFF', '#FF00FF', '#C0C0C0', '#FF34F5', '#000000', '#808080', '#FF0000', '#00FF02']}
            onFinished={(winner) => onFinished(winner)}
          />
        </div>
      }

      {winnerToBeDeclared && (<div className='fixed t-0 l-0 h-screen w-screen bg-[#765757] flex flex-col items-center justify-center'>
        <Confetti />

        <h1 className='text-4xl font-pacifico animate-scale-in text-white' >Congratulations!</h1>
        <br />
        <h1 className={`font-bold text-2xl text-[#d2e05a] text-center animate-fade-in ${noto_serif_malayalam.className}`}>{`${winnerToBeDeclared} `}</h1>
      </div>)
        }


    </div>


  )
}

export default Spin
