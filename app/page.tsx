"use client";
import React, { useEffect, useState } from "react";
import Wheel from "@components/Wheel";
import { participants as sampleParticipants } from "@data/sample";
import Link from "next/link";

import {fetchAllParticipants} from '@actions'

export default function Home() {
  interface Participant {
    name: string;
    serial: number;
    claimed: boolean;
  }
  interface IndexState {
    participant: Participant;
    participants: Participant[];
    winnerToBeDeclared: string;
  }

  const [participant, setParticipant] =useState<IndexState['participant']>('')
  const [participants, setParticipants] = useState<IndexState["participants"]>(
    []
  );

  
  // const [winnerToBeDeclared, setWinnerToBeDeclared] = useState<IndexState['winnerToBeDeclared']>('')

  // console.log(participant, ' is participant')
  // console.log(participants, ' are participants')

  // const addParticipant = () => {
  //   setParticipants([...participants, participant]);
  // };

  // const onFinished = (winner: string) => setWinnerToBeDeclared(winner);
  // const spinWheel = () => {
  //   const winningSegment = Math.floor(Math.random() * participants.length);
  //   const winner = participants[winningSegment];

  //   // Remove the winner from the participants list so that they cannot win again
  //   setParticipants(participants.filter(participant => participant !== winner));

  //   // Call the onFinished callback function with the winner's name
  //   onFinished(winner);
  // };

  // const fetchParticipants = async () => {
  //   try {
  //     const response = await fetch("api/participants/all");
  //     const data = await response.json();
  //     setParticipants(data.allParticipants);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
  fetchAllParticipants();
  }, []);

  return (
    <div className="flex flex-col items-center pt-4 bg-yellow-100 h-screen">
      <h1 className="font-bold text-3xl">ROSCA Wheel</h1>

      {/* <input
        type="text"
        className='text-red-600 w-40'
        placeholder="Enter participant name"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
      /> */}

      {/* <button onClick={addParticipant}>Add Participant</button> */}

      {/* <Wheel
        segments={participants}
        segColors={['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000', '#FF9E80', '#00FF00', '#0000FF', '#800080', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#FFFFFF', '#000000', '#808080', '#FF0000', '#00FF00']}
        onFinished={(winner) => onFinished(winner)}
      />
      {winnerToBeDeclared ?
       <h1 className='text-bold text-3xl text-green-900'>{`Congratulations ${winnerToBeDeclared} `}</h1>
       :
       <>Result will be here</>} */}
      <Link
        href="/admin/login"
        className="bg-blue-800 text-white rounded-xs p-2 m-2 hover:bg-blue-700"
      >
        Admin Login
      </Link>
      <Link
        href="/admin/register"
        className="bg-green-900 p-2 text-yellow-100 m-2 hover:bg-green-700"
      >
        Register as an admin
      </Link>
      <h1 className="text-blue-800 font-bold text-2xl pt-4">Prticipants</h1>
    
      {participants.length > 0 && (
        <table className="self-start m-4 bg-[#96D4D4] border border-black table-auto">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Claimed</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participantObject, index) => (
              <tr key={index} className={`${index % 2 === 1? '':'bg-green-300'}`}>
                <td>{index}</td>
                <td>{participantObject.name}</td>
                <td>{participantObject.claimed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
