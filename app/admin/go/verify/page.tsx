"use client";
import React, { useEffect, useState, FormEvent } from "react";
import OTPInput from "react-otp-input";
import { verifyOTP, createAdmin } from "@actions";
import Confirmation from "@components/Confirmation";
import { useStore } from "@src/store";
import OTPInputField from "@components/OTPInputField";
const numberOfInputs = 6;

const Verify = () => {
  const [otp, setOtp] = useState<string>("");
  const { runConfirmation, startResponseLoading, endResponseLoading } = useStore()

  const [storedUserObject, setStoredUserObject] = useState({
    pendingAdmin: "unauthorized",
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const handleChange = (otp: string) => {
    setOtp(otp);
  };


  // 13console.log(pendingAdmin, storedObject, " is admin to verify, its from local storage");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      //create a loading
      startResponseLoading('Verifying the OTP')
      const storedObjectRaw = localStorage.getItem("userObject");
      const storedObject = JSON.parse(storedObjectRaw || '');

      const { pendingAdmin }: { pendingAdmin: string } = storedObject;
      const data = await verifyOTP({ otp, admin: pendingAdmin });
      console.log("Verifying the OTP the  ", {
        otp,
        admin: pendingAdmin,
      });
      console.log("got data", data);

      if (data.success)
      //Email got verified
      {
        runConfirmation({
          message: data.message,
          success: true,
        }, 3000);

        setTimeout(async () => {
          //create a new admin with password
          const data = await createAdmin({ email: pendingAdmin });

          setTimeout(() => {
            //if Admin is created successfully
            if (data.success) {

              runConfirmation({ message: data.message, success: true }, 3000)

              setTimeout(() => {
                location.href = "/admin/go/login";
              }, 4000);

            } else {
              runConfirmation({ message: data.message, success: false }, 3000)
            }

          }, 3000 + 2000)

          console.log(data);
        }, 3000);
      } else {
        console.log("otp validation failed");
        runConfirmation({
          message: data.message,
          success: false,
        });

      }
      endResponseLoading()

    }
    catch (error) {
      console.error(error);
      endResponseLoading()
      runConfirmation({
        message: "something went wrong",
        success: false,
      });
    }

  };


  useEffect(() => {
    const storedUserObjectRaw = localStorage.getItem("userObject");
    if (storedUserObjectRaw) {
      const parsedUserObject = JSON.parse(storedUserObjectRaw);
      setStoredUserObject(parsedUserObject);
    }

    setInitialLoading(false);
  }, []);

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
