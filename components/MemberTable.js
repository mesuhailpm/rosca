import React from 'react';

const MemberTable = ({ participants, handleEdit, handleDelete, toggleFormModal, loading }) => {
    return (<div className='flex flex-col justify-center items-center'>
        {participants.length ? (<table className='bg-slate-500 max-w-lg'>
            <thead>
                <tr className='bg-blue-900 text-white'>
                    <td>Serial Number</td>
                    <td>Name</td>
                    <td>Status</td>
                    <td colSpan={2}>Action</td>
                </tr>
            </thead>
            <tbody>
                {participants.map((participant, index) => {
                    const { serial, name, claimed, _id } = participant
                    return (
                        <tr key={index} className={`${!(index % 2) && 'bg-sky-500'}`}>
                            <td>{serial}</td>
                            <td>{name}</td>
                            <td>{claimed === true ? 'Yes' : 'No'}</td>
                            <td className='hover:text-yellow-500'><button onClick={() => handleEdit(serial, name, claimed, edit, _id)}>Edit</button></td>
                            <td className='hover:text-red-500'><button onClick={() => handleDelete(_id)}>Delete</button></td>
                        </tr>)
                }
                )
                }
                <tr className='bg-purple-500'><td colSpan={5} align='center'><button className='p-2 pr-4 pl-4 rounded-md bg-green-800 text-yellow-100 hover:text-green-500' onClick={() => toggleFormModal(add)}>Want to add a member? click here</button></td></tr>
            </tbody>

        </table>)
            : (
                !loading ? (<h1>No Members</h1>)
                    : (
                        <h1>Loading...</h1>
                    )


            )
        }

    </div>
    );
};

export default MemberTable;
