"use client";
import React, { useEffect, useState } from "react";
import { verifyOtpForgot, createAdmin } from "@actions";
import { useStore } from "@src/store";
import { State } from "@types";
import OTPInputField from "@components/OTPInputField";

const Verify = () => {
  const [otp, setOtp] = useState<string>("");
  const { runConfirmation, showConfirmation } = useStore() as State

  useEffect(() => {
    console.log(showConfirmation)
  },[showConfirmation])

  const [storedUserObject, setStoredUserObject] = useState({
    pendingAdmin: "unauthorized",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const handleChange = (otp: string) => {
    setOtp(otp);
  };


  // console.log(pendingAdmin, storedObject, " is admin to verify, its from local storage");
  useEffect(() => {
    const storedUserObjectRaw = localStorage.getItem("userObject");
    if (storedUserObjectRaw) {
      const parsedUserObject = JSON.parse(storedUserObjectRaw);
      setStoredUserObject(parsedUserObject);
    }

    setInitialLoading(false);
  }, [storedUserObject.pendingAdmin]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const storedObjectRaw = localStorage.getItem("userObject");
    const storedObject = JSON.parse(storedObjectRaw || '');
    try {


      const { pendingAdmin }: { pendingAdmin: string } = storedObject;
      //create a loading
      const data = await verifyOtpForgot({ otp, admin: pendingAdmin });
      if (!data.success) { throw new Error(data.message) }
      console.log("sent otp with otp and admin to verify ", {
        otp,
        admin: pendingAdmin,
      });
      console.log("got data", data);

      runConfirmation({
        message: data.message,
        success: true,
      }, 3000
      )
      setTimeout(() => {
        // location.href = "/admin/reset-password";
      }, 4000);

    } catch (error: any) {
      console.log(error.message);
      runConfirmation(
        {
          message: error.message,
          success: false,
        }
      )
      // console.log('confrmation message should have completed as state is', useStore());


    }
  };

  if (initialLoading) return <h1 className="text-2xl text-center text-orange-600 ">Loading...</h1>

  if (storedUserObject.pendingAdmin === "unauthorized")
    return (
      <div className="bg-blue-300/50 h-screen pt-4">
        <h1 className="text-center font-bold uppercase">Unauthorized</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-gray-200 p-2">

      <OTPInputField
      email={storedUserObject.pendingAdmin}
      expiresIn={10}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      numberOfInputs={6}
      otp={otp}
      />

    </div>
  );
};

export default Verify;
