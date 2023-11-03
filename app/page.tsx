"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { fetchAllParticipants } from '@actions'

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

  // const [participant, setParticipant] = useState<IndexState['participant']>('')
  const [participants, setParticipants] = useState<IndexState["participants"]>(
    []
  );


  
  useEffect(() => {
    (async () => {
      const participants = await fetchAllParticipants();
      participants.sort((a, b) => a.serial - b.serial)
      setParticipants(participants);     
    })()

  }, []);

  return (
    <div className="flex flex-col items-center pt-4 bg-yellow-100 h-screen">
      <h1 className="font-bold text-3xl">ROSCA Wheel</h1>
      
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
              <tr key={index} className={`${index % 2 === 1 ? '' : 'bg-green-300'}`}>
                <td>{participantObject.serial}</td>
                <td>{participantObject.name}</td>
                <td>{participantObject.claimed?'Yes':'No'}{true}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
