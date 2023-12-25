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
  const { runConfirmation } = useStore()

  const [storedUserObject, setStoredUserObject] = useState({
    pendingAdmin: "unauthorized",
  });
  const [formData, setFormData] = useState({})

  const [initialLoading, setInitialLoading] = useState(true);
  const handleChange = (otp: string) => {
    setOtp(otp);
  };


  // 13console.log(pendingAdmin, storedObject, " is admin to verify, its from local storage");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
        }, 3000);

        setTimeout(async () => {
          //create a new admin with password
          const data = await createAdmin({ email: pendingAdmin });
          
            console.log(data);
            runConfirmation({ message: data.message, success: true }, 1000)
            setTimeout(() => {
              location.href = "/admin/login";
            }, 1000);
           
            console.log();          
        }, 2000);
      }else{
        console.log("otp validation failed");
        runConfirmation({
          message: data.message,
          success: false,
        });

      } 
      
    }
      catch (error) {
        console.error(error);
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
