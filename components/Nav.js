"use client";
import React from "react";
import Link from "next/link";
import logo2 from "public/assets/images/logo2.png";
import Image from "next/image";
import { useStore } from "@src/store";
import { useState, useEffect } from "react";

const Nav = () => {
  const { isLoggedIn } = useStore();
  const [HasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(
    () => {
      if (isLoggedIn) {
        setHasLoggedIn(true);
      } else {
        setHasLoggedIn(false);
      }
    },
    [isLoggedIn, HasLoggedIn],
    () => {
      // This function will be called on the initial render of the component.
      if (isLoggedIn) {
        setHasLoggedIn(true);
        if (!isLoggedIn) {
          setHasLoggedIn(false);
        }
      }
    }
  );
  console.log(HasLoggedIn, " is value of hasLoggedIn");

  return (
    <div
      className="w-screen flex p-2  items-center justify-between"
      style={{
        boxShadow:
          "box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4)" /* Horizontal offset, Vertical offset, Blur radius, Color */,
      }}
    >
      <Link href="/" className="">
        <Image src={logo2} width={100} alt="logo" />
      </Link>
    

      {HasLoggedIn ? (
        <button
          onClick={() => {
            useStore.setState({ isLoggedIn: false });
            alert(isLoggedIn);
          }}
          className="bg-blue-800 text-white rounded-xs p-2 m-2 hover:bg-blue-700"
        >
          Log Out
        </button>
      ) : (
        <Link
          href="/admin/login"
          className="bg-blue-800 text-white rounded-xs p-2 m-2 hover:bg-blue-700"
        >
          Admin Page
        </Link>
      )}
    </div>
  );
};

export default Nav;
