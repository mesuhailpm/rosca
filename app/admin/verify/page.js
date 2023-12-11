"use client";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { verifyOTP, createAdmin } from "@actions";
import Confirmation from "@components/Confirmation";
import { useStore } from "@src/store";

const Verify = () => {
  const [otp, setOtp] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState({
    message: "",
    success: true,
  });
  const [storedUserObject, setStoredUserObject] = useState({
    pendingAdmin: "unauthorized",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const numberOfInputs = 6;
  const handleChange = (otp) => {
    setOtp(otp);
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
  // 13console.log(pendingAdmin, storedObject, " is admin to verify, its from local storage");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedObjectRaw = localStorage.getItem("userObject");
    const storedObject = JSON.parse(localStorage.getItem("userObject"));

    const { pendingAdmin } = storedObject;
    //create a loading
    const data = await verifyOTP({ otp, admin: pendingAdmin });
    console.log("sent otp with otp and admin to verify ", {
      otp,
      admin: pendingAdmin,
    });
    console.log("got data", data);
    if (data.success) {
      setConfirmationMessage({
        message: data.message,
        success: true,
      });
      setTimeout(async () => {
        //create a new admin with password
        const data = await createAdmin({ email: pendingAdmin });
        if (data.success) {
          console.log(data);
          setConfirmationMessage({
            message: data.message,
            success: true,
          });
          setTimeout(() => {
            location.href = "/admin/login";
          }, 1000);
        } else {
          console.log();
          setConfirmationMessage({ message: data.message, success: false });
        }
      }, 2000);
    } else {
      console.log("otp validation failed");
      setConfirmationMessage({
        message: data.message,
        success: false,
      });
    }
  };

  //   useEffect(() => {
  //     if (otp.length === numberOfInputs) {
  //       console.log(otp);
  //       verifyOTP(otp);
  //     }
  //   }, [otp.length]);
  // const setOtp = (e) => setotp(e.target.value)

  useEffect(() => {
    const storedUserObjectRaw = localStorage.getItem("userObject");
    if (storedUserObjectRaw) {
      const parsedUserObject = JSON.parse(storedUserObjectRaw);
      setStoredUserObject(parsedUserObject);
    }
    if (storedUserObject.pendingAdmin !== "unauthorized") {
      setFomData((prev) => {
        return {
          ...prev,
          email: storedUserObject.pendingAdmin,
        };
      });
    }
    setInitialLoading(false);
  }, []);

  if(initialLoading) return <h1 className="text-2xl text-center text-orange-600 ">Loading...</h1>


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
          value={otp}
          onChange={handleChange}
          numInputs={numberOfInputs}
          renderInput={(props) => (
            <input {...props} className="m-2" inputMode="number" />
          )}
          inputStyle={{
            width: "20px"}}
          shouldAutoFocus={true}
        />
        <button
          className="bg-blue-800 text-fuchsia-100 p-2 m-2 hover:bg-blue-700  rounded-md"
          type="submit"
        >
          Submit
        </button>
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
