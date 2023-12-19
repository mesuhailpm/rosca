import React, { Dispatch, useEffect, useState } from 'react'
import { useStore } from '@src/store';
import { State } from '@types';


const useSampleHook = (initialValue: number) => {
    const [value, setvalue] = useState(initialValue)
    const {isLoggedIn} = useStore() as State
    const changeState = () => useStore.setState({isLoggedIn: Boolean(value)})
    

    useEffect(()=>{
        console.log(value);
        // useStore.setState({isLoggedIn: false})
        
    },[value])


    return {value, setvalue, changeState}
}

export default useSampleHook