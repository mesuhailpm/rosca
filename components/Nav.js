
'use client' 
import React from 'react'
import Link from 'next/link'
import logo1 from '/public/assets/images/logo1.png'
import logo2 from 'public/assets/images/logo2.png'
import Image from 'next/image'

const Nav = () => {
  return (
    <div className='w-screen flex p-2  items-center justify-between' style={{boxShadow:'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4)' /* Horizontal offset, Vertical offset, Blur radius, Color */}}>
        <Link  href='/' className=''>
            <Image src={logo2} width={100} alt="logo" />
        </Link>
        <Link href='/admin' className=''>
           Admin Login
        </Link>

    </div>
  )
}

export default Nav