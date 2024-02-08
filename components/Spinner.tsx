'use client'
import { useStore } from '@src/store';
import { State } from '@types';
import React from 'react'
import { Watch } from 'react-loader-spinner';


type SpinnerProps = {
  color?: string
}

const Spinner = ({ color }: SpinnerProps) => {
  const { responseLoading, loadingCaption } = useStore() as State

  if (responseLoading) {
    return (
      <div className='fixed flex flex-col items-center justify-center gap-2 bg-slate-100/40 left-0 top-0 w-screen h-screen'>
        <Watch
          height="80"
          width="80"
          radius="48"
          color={color && color || '#73fc03'}
          ariaLabel="watch-loading"
          wrapperStyle={{}} //Styles to be applied to the wrapper. It should be a valid CSS object and can be used for custom styling. It will override the default style.
          //wrapperClassName={undefined} // ClassName to be applied to the wrapper. It can be used for custom styling and will override the default style. This prop is expected as documentation but not working. Created a GH issue. https://github.com/mhnpd/react-loader-spinner/issues/164
          visible={true}
          wrapperClass='loading top-1/2 left-1/2'
        />
        {loadingCaption && <p className='text-xxl font-bold '>{loadingCaption}</p>}
      </div>
    )
  } else {
    return null
  }
}

export default Spinner
