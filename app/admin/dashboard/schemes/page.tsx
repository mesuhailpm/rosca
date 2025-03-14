'use client';
import { fetchSchemes } from '@actions';
import MainTable from '@components/MainTable';
import Link from 'next/link';
import { useStore } from '@src/store';
import { RoscaType, RoscaTypeExceptAdmins, State } from '@types';
import React, { useEffect, useState } from 'react'


const Schemes = () => {
    const { isLoggedIn, admin, adminLoading, participantsLoading } = useStore() as State
    const [schemes, setSchemes] = useState<RoscaTypeExceptAdmins[]>([]);
    const [schemesLoading, setSchemesLoading] = useState(true)
    const {selectedRosca , setSelectedRosca} = useStore() as State
    
    const handleSelectRosca = (roscaId: string) => {
        const rosca = schemes.find((rosca) => rosca._id === roscaId)
        if(!rosca) return;
        setSelectedRosca(rosca)
        localStorage.setItem('selectedRosca', JSON.stringify(rosca))
    }

    const state = useStore();
    // console.log(state);

    useEffect(() => {
        const  fetchSchemesfor = async (adminId: string) => {             
        setSchemesLoading(true)
            
        const fetchedSchemes: RoscaTypeExceptAdmins[] | string = await fetchSchemes(adminId);
        if(typeof fetchedSchemes === 'string') {setSchemesLoading(false); return;}
            setSchemes(fetchedSchemes);
            setSchemesLoading(false)
        }
        if (admin) {

            fetchSchemesfor(admin.adminId)
            
        }else{
        }

    }, [isLoggedIn, admin])

    if (!isLoggedIn && !adminLoading) {
        return <div>Unauthorized!!</div>
    }
    
    if(schemesLoading) return <h3 className="text-center text-white">Fetching Your Schemes...</h3>
    if (!schemes?.length) return <div>Create scheme</div>
    
    if ( selectedRosca ) {
        return <div className='text-white text-center flex flex-col items-center'>
        <MainTable/>
        {!participantsLoading  && <section className='w-2/4 bg-d-50 flex justify-between'>

        {/* Button for edit */}
        <Link href={'manage'} className='m-2 p-2 bg-blue-500 text-white rounded hover:ring-1 ring-yellow-400 font-semibold hover:font-bold' aria-label='Edit button'> <i className="fa-solid fa-list-check m-2"></i>Manage</Link>
        {/* Button for Spin */}
        <Link href={'spin'} className='m-2 p-2 bg-green-500 text-white rounded hover:ring-1 ring-yellow-400 font-semibold hover:font-bold' aria-label='Go to Spin'> <i className="fa-solid fa-award m-2"></i>Spin</Link>
        </section>}
        <button className='underline' onClick={()=>setSelectedRosca(null)}> <i className="fa-solid fa-arrow-left m-4"></i>Back to the schemes</button>
        
        </div> }
    return (
        <div className='text-white flex flex-col text-center'>
            <h1 className='text-2xl font-bold mb-4 text-teal-100'> Active Schemes</h1>
            {schemes.map((item, index) => (
                <button className=' hover:text-[1.1rem] text-transparent bg-gradient-to-bl bg-clip-text font-bold from-slate-100 via-yellow-500 to-fuchsia-500 bg-red-600' onClick={()=>handleSelectRosca(item._id)} key={item._id}>{item.name}</button>
            ))}
            <div className='mt-4'>
                <Link href={'schemes/create'} className='m-2 p-2 bg-blue-500 text-white rounded hover:ring-1 ring-yellow-400 font-semibold hover:font-bold' aria-label='Create Scheme'>
                    <i className="fa-solid fa-plus m-2"></i>Create Scheme
                </Link>
            </div>
        </div>
    )
}

export default Schemes