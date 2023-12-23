"use client";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { verifyOTP, createAdmin } from "@actions";
import Confirmation from "@components/Confirmation";
import { useStore } from "@src/store";
import { State } from "@types";

const Verify = () => {
  const [otp, setOtp] = useState<number>(0);
  const { runConfirmation } = useStore() as State
  const [confirmationMessage, setConfirmationMessage] = useState({
    message: "",
    success: true,
  });
  const [formData, setFormData] = useState({})

  const [storedUserObject, setStoredUserObject] = useState({
    pendingAdmin: "unauthorized",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const numberOfInputs = 6;
  const handleChange = (otp: number) => {
    setOtp(Number(otp));
  };

  useEffect(() => {
    if (confirmationMessage.message.length) {
      setShowConfirmationMessage(true);
      setTimeout(() => {
        setConfirmationMessage({ message: "", success: true });
        setShowConfirmationMessage(false);
      }, 1000);
    }
  }, [confirmationMessage.success, confirmationMessage.message]);
  // console.log(pendingAdmin, storedObject, " is admin to verify, its from local storage");
  useEffect(() => {
    const storedUserObjectRaw = localStorage.getItem("userObject");
    if (storedUserObjectRaw) {
      const parsedUserObject = JSON.parse(storedUserObjectRaw);
      setStoredUserObject(parsedUserObject);
    }
    if (storedUserObject.pendingAdmin !== "unauthorized") {
      setFormData((prev) => {
        return {
          ...prev,
          email: storedUserObject.pendingAdmin,
        };
      });
    }
    setInitialLoading(false);
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedObjectRaw = localStorage.getItem("userObject");
    const storedObject = JSON.parse(storedObjectRaw || '');

    const { pendingAdmin }: { pendingAdmin: string } = storedObject;
    //create a loading
    const data = await verifyOTP({ otp, admin: pendingAdmin });
    console.log("sent otp with otp and admin to verify ", {
      otp,
      admin: pendingAdmin,
    });
    console.log("got data", data);
    if (data.success) {

      runConfirmation({ 
        message: data.message,
        success: true,
      },1000
      ) 
        setTimeout(() => {
          location.href = "/admin/reset-password";
        }, 1000);

    } else {
      console.log("otp validation failed");
      runConfirmation(

        {
          message: data.message,
          success: false,
        }
        )
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
      <h1 className="text-xl font-bold">Enter the OTP</h1>
      <form
        className="p-4 m-2 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="otp">Enter OTP</label>
        <OTPInput
          value={otp.toString()}
          onChange={handleChange}
          numInputs={numberOfInputs}
          renderInput={(props) => (
            <input {...props} className="m-2" inputMode="number" />
          )}
          shouldAutoFocus={true}
        />
        <button className="bg-blue-800 text-fuchsia-100 p-2 m-2 hover:bg-blue-700  rounded-md" type="submit">Submit</button>
      </form>
      {showConfirmationMessage && (
        <div className="fixed top-0 right-0 flex flex-col gap-4 bg-gray-200/75 items-center w-screen h-screen justify-center">
          {" "}
          <Confirmation confirmationMessage={confirmationMessage} />
          <h1 className="text-black font-bold"></h1>
        </div>
      )}
    </div>
  );
};

export default Verify;
