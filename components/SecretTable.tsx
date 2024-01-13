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

  const [showSecretForm, setShowSecretForm] = useState(false)

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
    if (e.key === 'Enter')
      await handleAddSecret()
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
        setSecretState((prev)=>(
          prev.filter((secret)=> secret._id !== id)
        ))
        runConfirmation({ message: data.message, success: true }, 4000)

      } catch (error: any) {
        runConfirmation({ message: error, success: false })
        endResponseLoading()
      }
    }

  }
  return (
    <>

      <table className='bg-teal-600/75 text-white w-10 table-auto' >
        <thead>
          <tr>
            <th>Secrets</th>
            <th>Do</th>

          </tr>
        </thead>

        <tbody className='text-black'>
          {secretState.map((secret, index) => (

            <tr key={index}>
              <td>
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
              <td>
                <button className='border border-black p-1 rounded-sm hover:bg-red-400' onClick={() => handleDelete(secret._id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody >
      </table>
      {!showSecretForm && <button onClick={() => setShowSecretForm(true)}>Create a new secret</button>}
      {showSecretForm && (<input type='text' name='secret' value={secretInForm} onKeyDown={handleKeyDown} onChange={handleChange}></input>)}
    </>
  )
}

export default SecretTable