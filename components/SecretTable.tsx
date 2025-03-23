'use client'
import { useStore } from '@src/store'
import Image from 'next/image'
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import eye from 'public/assets/images/eye.svg'
import hidden from 'public/assets/images/hide.svg'
import { SecretDocument } from '@models/Secret'


const SecretTable = () => {
  const [loading, setLoading] = useState(true)

  const [secretInForm, setSecretInForm] = useState({ secret: '' })
  const [secretState, setSecretState] = useState<{ value: string, _id: string, visibility: boolean }[]>([])


  const { runConfirmation, startResponseLoading, endResponseLoading } = useStore()
  const AuthorizationParametersRef = useRef({ token: null, headers: {} })


  useEffect(() => {
  const { token } = JSON.parse(localStorage.getItem("userObject") || '');

  const headers = {
    'Authorization': `Bearer ${token}`
  };
  AuthorizationParametersRef.current = { token, headers };

  const fetchSecretsFromServer = async () => {
    try {
      const response = await fetch('/api/superadmin/secret', {
        method: 'POST',
        body: JSON.stringify({ get: true, token, secret: '' }),
        headers,
        next: { revalidate: 60 } // revalidate every 60 seconds
      });

      if (!response.ok) {
        throw new Error('Failed to fetch secrets from server');
      }

      const secretsFromServer:{secrets: SecretDocument[]} = await response.json();
      const secretsData = secretsFromServer ? secretsFromServer.secrets.map((el) => {
        const { _id, secret } = el;
        return { _id, value: secret, visibility: false };
      }) : [];

      setSecretState(secretsData);
    } catch (error: any) {
      runConfirmation({ message: error.message, success: false })
    } finally {
      setLoading(false); // Ensure this runs whether there's an error or not
    }
  };

  fetchSecretsFromServer();
}, []);




  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretInForm({ secret: e.target.value })
  }

  const handleAddSecret = async () => {
    try {
      startResponseLoading()

      const response = await fetch(`/api/superadmin/secret`, { method: 'POST', body: JSON.stringify(secretInForm), headers: AuthorizationParametersRef.current.headers })
      const data = await response.json();

      if (!data.success) throw new Error(data.message)
      runConfirmation({ message: data.message, success: data.success })

      endResponseLoading()
      const newSecretState = secretState
      newSecretState.push({ value: data.result.secret, visibility: false, _id: data.result._id })
      setSecretState(newSecretState)

    } catch (error: any) {

      endResponseLoading()
      runConfirmation({ message: error.message, success: false })

    }
  }
  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleAddSecret()
      setSecretInForm({ secret: '' })
    }
  }
  const toggleVisibility = (id: string) => {
    setSecretState(prev => {
      return prev.map((secret) => {
        return { ...secret, visibility: secret._id === id ? !secret.visibility : secret.visibility }
      })
    })
  }

  const handleDelete = async (id: string) => {
    const { token, headers } = AuthorizationParametersRef.current

    if (confirm("Do you want to proceed?")) {
      try {
        if (!token) {
          throw Error('Unauthorized, Try Re-loging in')
        }
        startResponseLoading()
        const response = await fetch(`/api/superadmin/secret`, { method: 'DELETE', body: JSON.stringify(id), headers })

        const data = await response.json()
        endResponseLoading()
        setSecretState((prev) => (
          prev.filter((secret) => secret._id !== id)
        ))
        runConfirmation({ message: data.message, success: true }, 4000)

      } catch (error: any) {
        runConfirmation({ message: error, success: false })
        endResponseLoading()
      }
    }

  }
  if (loading) return <h1 className='text-white text-center' > Loading Secrets..</h1>
  return (
    <div className='w-full flex flex-col text-white'>
      <h2 className='text-3xl font-semibold m-[1rem] text-yellow-500'>Manage Secrets</h2>

      <table className='bg-teal-600/75 m-2 border-none rounded-md w-8' >
        <thead>
          <tr className='border-none'>
            <th className='border-none'>Secrets</th>
            <th className='border-none'>Control</th>

          </tr>
        </thead>

        <tbody className='text-black'>
          {secretState.map((secret, index) => (

            <tr key={index} className='border-none'>
              <td className='border-none min-w-0'>
                <div className="flex w-full min-w-[200px]">
                  <input
                    className='text-black border-none p-0 outline-none bg-transparent text-[1.2rem] font-mono font-bold w-full'
                    value={secret.value}
                    type={secret.visibility ? 'text' : 'password'}
                    readOnly
                  />
                  <a onClick={() => toggleVisibility(secret._id)} className='cursor-pointer flex justify-center'>
                    <Image src={secret.visibility ? hidden : eye} alt={`${secret.visibility ? 'hide' : 'show'}'-button`}  height={20} width={20} />
                  </a>
                </div>
              </td>

              <td className='border-none'>
                <button className='border font-bold rounded-md border-none p-2 bg-rose-500 hover:bg-black hover:text-red-500 hover:ring-2 ring-yellow-300' onClick={() => handleDelete(secret._id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody >
      </table>
      <p className='font-bold text-cyan-500 border-none px-2'>Add A Secret</p>
      <input type='text' name='secret' value={secretInForm.secret} onKeyDown={handleKeyDown} onChange={handleChange} className='text-black bg-cyan-200 outline-none w-fit px-2 m-2 text-sm min-w-[250px] text-center' placeholder="Type your secret and press enter" />

    </div>
  )
}

export default SecretTable
