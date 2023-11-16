import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center bg-white w-full'>
      <p>{`All rights reserved \u00A9 ${new Date().getFullYear()}`}</p>
    </div>
  )
}

export default Footer