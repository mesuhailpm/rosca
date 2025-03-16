'use client'

import { useEffect, useState } from 'react';
import RoscaElement from '@components/RoscaElement';
import { useStore } from '@src/store';
import { AdminModelType, Participants, RoscaType } from '@types';
export type CustomRosca = Omit <RoscaType, 'admins' | 'participants' > & {
    _id: string
    admins: AdminModelType[],
    participants: Participants
  }

const RoscaList = () => {
  const [schemes, setSchemes] = useState<CustomRosca[]>([]);
  const [loading, setLoading ] = useState(true)
  const { runConfirmation, startResponseLoading, endResponseLoading } = useStore();

  useEffect(() => {
    setLoading(true)
    const fetchAllSchemes = async () => {
      const { token } = JSON.parse(localStorage.getItem('userObject') || '');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch('/api/superadmin/schemes', { headers });
        const data: { success: boolean; schemes?: CustomRosca[]; message?: string } = await response.json();
        
        if (data.success) {
          setSchemes(data.schemes || []);
        } else {
          runConfirmation({ message: data.message || 'Failed to fetch schemes', success: false });
        }
      } catch (error: any) {
        runConfirmation({ message: error?.message || 'Something went wrong', success: false });
      } finally {
        setLoading(false)
      }
    };

    fetchAllSchemes();
  }, [startResponseLoading, endResponseLoading, runConfirmation]);

  if (loading) return <h1 className='text-white text-center' > Loading Schemes..</h1>
  return (
    <section className='text-white flex flex-col items-center w-full'>
      <h2 className='text-3xl font-semibold self-start text-yellow-500 m-[1rem]'>All Schemes</h2>
      {schemes.map((scheme, index) => (
        <RoscaElement key={scheme._id} order={index + 1} scheme={scheme} setSchemes={setSchemes} />
      ))}
    </section>
  );
};

export default RoscaList;
