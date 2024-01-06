"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useStore } from "@src/store";
import { State } from "@types";
import useSubmitForm from "@hooks/useSubmitForm";

const MemberForm = () => {
  const { formData, toggleShowFormModal, showFormModal, action } = useStore() as State;
  const [componentActionTitle, setComponentActionTitle] = useState(action)
  const actionAsTitle = componentActionTitle && (`${componentActionTitle[0]?.toUpperCase()}${componentActionTitle.slice(1)}`)
  const submitButtonLabel = action === "edit" ? "Update" : "Create";

  const [componentFormData, setComponentFormData] = useState(formData)
  const { serial, claimed, name } = componentFormData;
  const { setValue } = useSubmitForm()




  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setComponentFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })

  }

  console.log(useStore())
  useEffect(() => {
    setComponentFormData(formData)
    setComponentActionTitle(action)

  }, [formData, action])
    return (
      <div
        className={`fixed w-screen h-screen top-0 left-0 flex items-center justify-center modal ${showFormModal && 'appear'}`}
      >
        <form
          className={`relative bg-red-400 flex flex-col gap-1 p-4 rounded-md border border-yellow-100`}
          onSubmit={(e) => { e.preventDefault(); setValue({ action, _id: formData._id, formData: componentFormData }) }}
        >
          <button
            type="button"
            className="absolute right-[5%] top-[5%] p-1 rounded-md bg-teal-300 flex hover:text-red-500"
            onClick={() => toggleShowFormModal()}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <h1 className="text-center font-bold uppercase">{`${actionAsTitle} a member`}</h1>
          <label htmlFor="serial" className="font-bold">Serial</label>
          <input
            type="number"
            id="serial"
            name="serial"
            max={30}
            maxLength={2}
            onChange={handleChange}
            className="border border-black outline-none"
            value={String(serial)}
          />
          <label htmlFor="name"  className="font-bold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="border border-black outline-none"
            value={name}
          />
          <label htmlFor="claimed"  className="font-bold">Claimed</label>
          <select
            id="claimed"
            name="claimed"
            onChange={handleChange}
            value={claimed.toString()}
            className="border border-black"
          >
            <option value="">Please select an option</option>
            <option value={true.toString()}>Yes</option>
            <option value={false.toString()}>No</option>
          </select>
          <br />
          <button
            type="submit"
            className="border bg-blue-800 hover:border-black w-20 rounded-lg text-[#f5ffff] self-center p-2 "
          >
            {submitButtonLabel}
          </button>
        </form>
      </div>

    );
};

export default MemberForm;
