'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useStore } from "@src/store";
import { addParticipant, deleteParticipant, updateParticipant } from "@actions";
import { Participant, State } from "@types";



// const { responseLoading, confirmationMessage, participants } = useStore() as State


const edit = 'edit'
const add = 'add'
const remove = 'remove'


const initialFomData = {
  _id: '',
  serial: 0,
  name: '',
  claimed: false

}




export const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value
    }
  })

}



