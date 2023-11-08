import React from 'react'
import completeIcon from 'public/assets/images/complete-icon.png'

import errorIcon from 'public/assets/images/incorrect-icon.png'
import Image from 'next/image';

const Confirmation = ({confirmationMessage}) => {
  const {success, message} = confirmationMessage
  const icon = success ? completeIcon : errorIcon
  return (
    <div className='fixed flex flex-col justify-center items-center border border-4 p-2 h-40 border-black rounded-xl gap-4 font-bold bg-white/75  self-center'
      >
        <h1>{`${message}!`}</h1> 
        <Image src={icon} width={40} className='border border-black rounded-full' alt='success/failur logo'/>

    </div>
  )
}

export default Confirmation