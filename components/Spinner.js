'use client'
import { useStore } from '@src/store';
import React from 'react'
import {Watch} from 'react-loader-spinner';




const Spinner = ({color}) => {
  const { responseLoading } = useStore

  if (responseLoading) 
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
/>
  )
}

export default Spinner
