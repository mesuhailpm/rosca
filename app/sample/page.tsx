'use client';
import useSampleHook from '@hooks/useSampleHook'
import React from 'react'


const page = () => {
    const { value, setvalue, changeState } = useSampleHook(0)


    return (

        <div>
            <button onClick={() => setvalue(2)}>Click me</button>
            {value}
            <button onClick={changeState}>Click Her to login</button>
        </div>
    )
}

export default page