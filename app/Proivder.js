"use client";
import React, { createContext, useState, useEffect } from "react";
import { useStore } from "@src/store";

const DataContext = createContext(null);

const Provider = ({ data, children }) => {
  const [participants, setParticipants] = useState(data.allParticipants);
  console.log(data,' data', children,' children', participants,'participants', setParticipants,'departicipants', ' from provider');
  console.log('data, children');

  useEffect(() => {
    setParticipants(data)
  
    return () => {
      
    }
  }, [])
  


  return (
    <DataContext.Provider value={{ participants, setParticipants }}>
      {children}
    </DataContext.Provider>
  );
};

export default Provider;
export { DataContext };
