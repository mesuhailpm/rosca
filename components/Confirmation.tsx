"use client";
import React from "react";
import completeIcon from "public/assets/images/complete-icon.png";

import errorIcon from "public/assets/images/incorrect-icon.png";
import Image from "next/image";
import { useStore } from "@src/store";
import { State } from "@types";

const Confirmation = ({}) => {
  const { confirmationMessage, showConfirmation } = useStore() as State;
  const { success, message } = confirmationMessage;
  const icon = success ? completeIcon : errorIcon;

  if (showConfirmation)
    return (
      <div className="bg-sky-950/[.5] z-100 flex fixed h-screen w-screen top-0 left-0 items-center justify-center">
        <div className="fixed flex flex-col justify-center items-center border p-2 h-40 border-black rounded-xl gap-4 font-bold bg-white/75  self-center">
          <h1>{`${message}!`}</h1>
          <Image
            src={icon}
            width={40}
            className="border border-black rounded-full"
            alt="success/failure logo"
          />
        </div>
      </div>
    )
    return null
};

export default Confirmation;
