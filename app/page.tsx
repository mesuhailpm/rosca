'use client'
import {useStore} from '@src/store';
import {useState, useEffect } from 'react'
import { fetchAllParticipants } from '@actions';


export default function Home() {
  const {participants, setParticipants} = useStore()


  type Participant = {
    name: string;
    serial: number;
    claimed: boolean;
  }
  interface IndexState {
    participant: Participant;
    participants: Participant[];
    winnerToBeDeclared: string;
  }
      const fetchParticipants = async ()=>{
        try {
          const fetchedParticipants = await fetchAllParticipants();
          fetchedParticipants.sort((a:Participant, b:Participant) => a.serial - b.serial)
          useStore.setState({participants: fetchedParticipants});
          
        } catch (error) {
          console.log(error);
          
        }
      }


  // const [participant, setParticipant] = useState<IndexState['participant']>('')
  
  useEffect(()=>{
    fetchParticipants()
  },[])


  return (
    <div className="flex flex-col items-center pt-4 bg-yellow-100 h-full">
      <h1 className="font-bold text-3xl">ROSCA Wheel</h1>
      
      <h1 className="text-blue-800 font-bold text-2xl pt-4">Participants</h1>
      {/* {loading && (<h1>Loading members list</h1>)} */}
      {participants.length > 0 && (
        <table className="self-start m-4 bg-[#96D4D4] border border-black table-auto font-raleway">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Claimed</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participantObject:Participant, index:number) => (
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
