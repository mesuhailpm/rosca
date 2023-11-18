import React from 'react'

const Footer = () => {
  return (
    <div className='mt-auto flex justify-center bg-white'>
      <p>{`All rights reserved \u00A9 ${new Date().getFullYear()}`}</p>
    </div>
  )
}

export default Footer