import React from "react";

const MemberForm = ({
  handleSubmit,
  handleChange,
  formData,
  toggleFormModal,
  action,
}) => {
  const { _id, serial, name, claimed } = formData;
  const actionAsTitle = `${action[0]?.toUpperCase()}${action.slice(1)}`;
  const submitButtonLabel = action === "edit" ? "Update" : "Create";
  return (
    <form
      className="relative bg-red-400 flex flex-col gap-1 p-4 rounded-md"
      onSubmit={(e) => handleSubmit(e, action, _id, formData)}
    >
      <button
        type="button"
        className="absolute right-[5%] top-[5%] p-1 rounded-md bg-teal-300 flex hover:text-red-500"
        onClick={toggleFormModal}
      >
       <i className="fa fa-times" aria-hidden="true"></i>

      </button>
      <h1 className="text-center">{`${actionAsTitle} a member`}</h1>
      <label htmlFor="serial">Serial</label>
      <input
        type="number"
        id="serial"
        name="serial"
        max={30}
        maxLength={2}
        onChange={handleChange}
        value={String(serial)}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={name}
      />
      <label htmlFor="claimed">Claimed</label>
      <select
        id="claimed"
        name="claimed"
        onChange={handleChange}
        value={claimed}
      >
        <option value="">Please select an option</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <br />
      <button
        type="submit"
        className="border bg-blue-800 hover:border-black w-20 rounded-lg text-[#f5ffff] self-center p-2 "
      >
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default MemberForm;
