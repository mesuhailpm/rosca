'use client'
import React from 'react'
import {Watch} from 'react-loader-spinner';


const Spinner = ({color}) => {
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
