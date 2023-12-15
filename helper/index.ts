'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useStore } from "@src/store";
import { addParticipant, deleteParticipant, updateParticipant } from "@actions";
import { Participant, State } from "@types";



// const { responseLoading, confirmationMessage, participants } = useStore() as State

