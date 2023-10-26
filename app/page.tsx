'use client'
import React, { useState } from 'react';
import Wheel from '@components/Wheel';
import { participants as sampleParticipants } from '@data/sample';

export default function Home() {

  interface IndexState {
    participant: string;
    participants: string[];
    winnerToBeDeclared: string;
  }
  const [participant, setParticipant] =useState<IndexState['participant']>('')
  const [participants, setParticipants] = useState<IndexState['participants']>(sampleParticipants);
  const [winnerToBeDeclared, setWinnerToBeDeclared] = useState<IndexState['winnerToBeDeclared']>('')
  console.log(participant, ' is participant')
  console.log(participants, ' are participants')

  const addParticipant = () => {
    setParticipants([...participants, participant]);
  };

  const onFinished = (winner: string) => setWinnerToBeDeclared(winner);
  const spinWheel = () => {
    const winningSegment = Math.floor(Math.random() * participants.length);
    const winner = participants[winningSegment];

    // Remove the winner from the participants list so that they cannot win again
    setParticipants(participants.filter(participant => participant !== winner));

    // Call the onFinished callback function with the winner's name
    onFinished(winner);
  };

  return (
    <div className='flex flex-col items-center pt-4'>
      <h1 className='font-bold text-3xl'>ROSCA Wheel</h1>

      <input
        type="text"
        className='text-red-600 w-40'
        placeholder="Enter participant name"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
      />

      <button onClick={addParticipant}>Add Participant</button>

      <Wheel
        segments={participants}
        segColors={['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000', '#FF9E80', '#00FF00', '#0000FF', '#800080', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#FFFFFF', '#000000', '#808080', '#FF0000', '#00FF00']}
        onFinished={(winner) => onFinished(winner)}
      />
      {winnerToBeDeclared ?
       <h1 className='text-bold text-3xl text-green-900'>{`Congratulations ${winnerToBeDeclared} `}</h1>
       :
       <></>}

    </div>
  );
};
