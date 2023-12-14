'use client'
import { useStore } from '@src/store';
import React from 'react'
import { Watch } from 'react-loader-spinner';




const Spinner = ({ color }) => {
  const { responseLoading } = useStore()

  if (responseLoading) {
    return (
      <Watch
        height="80"
        width="80"
        radius="48"
        color={color && color || '#73fc03'}
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        wrapperClass='fixed w-screen h-screen border border-black loading top-0 right-0 flex justify-center items-center'
      />
    )
  } else {
    return null
  }
}

export default Spinner
