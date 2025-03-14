'use client'
import { RoscaDoc } from '@models/Rosca';
import { useRouter } from 'next/navigation'; 
import { useStore } from '@src/store';
import { State } from '@types';
import React, { useState } from 'react';
import { ParticipantFormData } from '@types';

const Page = () => {

    const {runConfirmation, responseLoading, endResponseLoading, startResponseLoading, setSelectedRosca} = useStore() as State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState < Omit < ParticipantFormData,'roscaId'>[]> ([{ name: '', claimed: false, serial: 1}]);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {

        
       
        
        e.preventDefault();
        try {          
            startResponseLoading('Working on it...')
            const {token} = JSON.parse(localStorage.getItem("userObject")|| ''); console.log('token is ', token);
            if(!token) {throw new Error('Token not found')}
            const res = await fetch(`/api/schemes`, {
                 method: 'POST', 
                 body:JSON.stringify({
                    name, participants
                }),
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            })
            console.log(res)
            const {result, message, success} : {result?: RoscaDoc, message :string, success: boolean} = await res.json()
            if(!result){
                throw new Error(message)
            }
            setSelectedRosca(result)            

        // Handle form submission logic here
        endResponseLoading()
        
        runConfirmation({message: message, success:true}, 1000)
        setTimeout(() => {
            router.push(`/admin/dashboard/schemes`)
        }, 100);
    } catch (error: any) {
        
        endResponseLoading()
        console.log(error)
        runConfirmation({message: error.message || 'Something went wrong!', success: false},3000)
        
    } };

    const handleParticipantChange = (index: number, field: 'name' | 'claimed', value: string | boolean) => {
        setParticipants((prevParticipants) => {
            const newParticipants = [...prevParticipants]; // Make a copy of the array
            newParticipants[index] = { 
                ...newParticipants[index], // Copy the existing participant data
                [field]: value,  // Update the specific field
            };
            return newParticipants;
        });
    };

    const addParticipant = () => {
        setParticipants([...participants, { name: '', claimed: false,  serial : participants.length + 1 }]);
    };

    const removeParticipant = (index: number) => {
        setParticipants((prevParticipants) => prevParticipants.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-white">Create Scheme</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Participants:</label>
                        {participants.map((participant, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Participant Name"
                                    value={participant.name}
                                    onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700  text-white"
                                />
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={participant.claimed}
                                        onChange={(e) => handleParticipantChange(index, 'claimed', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label className="ml-2 block text-sm text-gray-300">Claimed</label>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeParticipant(index)}
                                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                >
                                    Remove Participant
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addParticipant}
                            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            Add Participant
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        Create Scheme
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;