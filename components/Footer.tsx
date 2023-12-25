import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-auto flex gap-2 justify-center bg-white'>
      <Link href={'/terms'} className="items-self-end font-bold  underline">T&C</Link>
      <p>{`All rights reserved \u00A9 ${new Date().getFullYear()}`}</p>
    </div>
  )
}

export default Footer