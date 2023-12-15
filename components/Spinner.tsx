'use client'
import { useStore } from '@src/store';
import { State } from '@types';
import React from 'react'
import { Watch } from 'react-loader-spinner';


type SpinnerProps = {
  color?: string
}

const Spinner = ({ color }: SpinnerProps) => {
  const { responseLoading } = useStore() as State

  if (responseLoading) {
    return (
      <Watch
        height="80"
        width="80"
        radius="48"
        color={color && color || '#73fc03'}
        ariaLabel="watch-loading"
        wrapperStyle={{}} //Styles to be applied to the wrapper. It should be a valid CSS object and can be used for custom styling. It will override the default style.
        //wrapperClassName={undefined} // ClassName to be applied to the wrapper. It can be used for custom styling and will override the default style. This prop is expected as documentation but not working. Created a GH issue.https://github.com/mhnpd/react-loader-spinner/issues/164
        visible={true}
        wrapperClass='fixed w-screen h-screen border border-black loading top-0 right-0 flex justify-center items-center'
      />
    )
  } else {
    return null
  }
}

export default Spinner
