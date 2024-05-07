'use client'
import { useStore } from '@src/store'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

const SecretTable = ({ secrets, eye, hidden }: { secrets: Array<{ secret: string, _id: string }>, eye: StaticImport, hidden: StaticImport }) => {

  const secretsData = secrets.map((secret) => {
    return { ...secret, visibility: false }
  })
  const [secretInForm, setSecretInForm] = useState('')
  const [secretState, setSecretState] = useState(secretsData)


  const { runConfirmation, startResponseLoading, endResponseLoading } = useStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretInForm(e.target.value)
  }

  const handleAddSecret = async () => {
    try {
      startResponseLoading()

      const response = await fetch(`/api/secret`, { method: 'POST', body: JSON.stringify(secretInForm) })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      runConfirmation({ message: data.message, success: true })

      endResponseLoading()
      const newSecretState = secretState
      newSecretState.push(data.result)
      setSecretState(newSecretState)

    } catch (error: any) {
      endResponseLoading()
      runConfirmation({ message: error.message, success: false })

    }
  }
  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleAddSecret()
      setSecretInForm('')
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
    console.log(id, ' kis id')
    if (confirm("Do you want to proceed?")) {
      try {
        startResponseLoading()
        const response = await fetch(`/api/secret`, { method: 'DELETE', body: JSON.stringify(id) })

        const data = await response.json()

        console.log(data)
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
  return (
    <div className='w-full flex flex-col items-center'>

      <table className='self-center bg-teal-600/75 text-white table-auto w-fit m-2 border-none rounded-md' >
        <thead >
          <tr className='border-none'>
            <th className='border-none'>Secrets</th>
            <th className='border-none'>Control</th>

          </tr>
        </thead>

        <tbody className='text-black'>
          {secretState.map((secret, index) => (

            <tr key={index} className='border-none'>
              <td className='border-none'>
                <div className='flex justify-between items-center'>
                  <input className='text-black border-none outline-none bg-transparent text-xl font-mono font-bold italic'
                    type={secret.visibility ? 'text' : 'password'}
                    value={secret.secret}
                    readOnly
                  />

                  <a onClick={() => toggleVisibility(secret._id)} className='cursor-pointer'>
                    <Image src={secret.visibility ? hidden : eye} alt="show-button" height={20} width={20} className='m-3' />
                  </a>
                </div>
              </td>
              <td className='border-none'>
                <button className='border font-bold rounded-md border-none p-2 bg-rose-500 hover:bg-red-600' onClick={() => handleDelete(secret._id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody >
      </table>
      <div className='bg-cyan-200 font-bold text-slate-900 border-none px-2'>Add Another Secret</div>
      <input type='text' name='secret' value={secretInForm} onKeyDown={handleKeyDown} onChange={handleChange} className=' bg-cyan-200 outline-none px-2 m-2' placeholder="type your secret and press enter"/>
      
    </div>
  )
}

export default SecretTable