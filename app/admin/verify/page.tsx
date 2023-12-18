"use client";
import React, { useEffect, useState, FormEvent } from "react";
import OTPInput from "react-otp-input";
import { verifyOTP, createAdmin } from "@actions";
import Confirmation from "@components/Confirmation";
import { useStore } from "@src/store";
const numberOfInputs = 6;

const Verify = () => {
  const { runConfirmation } = useStore()
  const [otp, setOtp] = useState<number>(0);

  const [storedUserObject, setStoredUserObject] = useState({
    pendingAdmin: "unauthorized",
  });
  const [formData, setFormData] = useState({})

  const [initialLoading, setInitialLoading] = useState(true);
  const handleChange = (otp: string) => {
    setOtp(Number(otp));
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
          if (data.success) {
            console.log(data);
            runConfirmation({ message: data.message, success: true }, 1000)
            setTimeout(() => {
              location.href = "/admin/login";
            }, 1000);
          } else {
            console.log();
            runConfirmation({ message: data.message, success: false });
          }
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
            <input {...props} className="m-2" inputMode="numeric" />
          )}
          inputStyle={{
            width: "20px"
          }}
          shouldAutoFocus={true}
        />
        <button
          className="bg-blue-800 text-fuchsia-100 p-2 m-2 hover:bg-blue-700  rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
      
          <Confirmation />

    </div>
  );
};

export default Verify;
