"use client";
import React from "react";
import Link from "next/link";
import logo from "public/assets/images/logo.png";
import Image from "next/image";
import { useStore } from "@src/store";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { isLoggedIn } = useStore();
  const [HasLoggedIn, setHasLoggedIn] = useState(false);
  const pathname = usePathname()
  console.log(pathname)



  //console.logisLoggedIn, " is value of isLoggedIn");
  //console.logHasLoggedIn, " is value of hasLoggedIn");

  const checkLoggedin = async () => {
    try {
      console.log("checking");

      const userObject = await JSON.parse(
        localStorage.getItem("userObject") || ""
      );
      const { token } = userObject;
      //console.logtoken, " is token in local storage");

      // const isTokenValid = await verifyToken(token)
      const response = await fetch("/api/verifyToken", {
        method: "POST",
        body: JSON.stringify(token),
      });

      const decodedData = await response.json();
      //console.logdecodedData, " is decoded data from jsonwebtoken");
      if (response.ok) {
        // setVerifyLoading
        useStore.setState({ isLoggedIn: true });
      } else {
        useStore.setState({ isLoggedIn: false });
      }
    } catch (error) {
      console.log(error);
      useStore.setState({ isLoggedIn: false });
    }
  };

  useEffect(() => {
    (async () => {
      //console.log"useEffect");

      await checkLoggedin();
    })();
  }, []);

  return (
    <div
      className="w-screen flex p-2  items-center justify-between"
      style={{
        boxShadow:
          "box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4)" /* Horizontal offset, Vertical offset, Blur radius, Color */,
      }}
    >
      <Link href="/" className="">
        <Image src={logo} width={100} alt="logo" />
      </Link>

      {isLoggedIn === true ? (
        <div className="self-end flex">
          {pathname !== "/spin" && (
            <Link
              href="/spin"
              className="flex gap-1 items-center bg-blue-800 text-white tex-xxl rounded-md p-2 m-2 hover:bg-blue-700 border border-yello-100"
            >
              <i className="fa fa-cogs fa-lg" aria-hidden="true"></i>
              <p>Manage</p>
            </Link>
          )}

          <button
            onClick={() => {
              useStore.setState({ isLoggedIn: false });
              localStorage.removeItem("userObject");
            }}
            className="bg-orange-600 text-white rounded-md p-2 m-2 hover:bg-red-700 border border-yello-100"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/admin/login"
          className="flex gap-1 items-center justify-center bg-blue-800 text-white rounded-md p-2 m-2 hover:bg-blue-700 border border-yello-100"
        >
          <i className="fa fa-unlock" aria-hidden="true"></i>
          <p>Admin Login</p>
        </Link>
      )}
    </div>
  );
};

export default Nav;
