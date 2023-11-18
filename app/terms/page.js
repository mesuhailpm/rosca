import React from "react";
import { terms } from "../../utils/lib";

const page = () => {
  return (
    <main className="bg-slate-300 w-screen h-full p-5 flex flex-col items-center">
      <h1 className="font-bold text-3xl">
        നിയമാവലി
      </h1>
      <h1 className="font-bold text-xl">
        Participants are obliged to follow these terms and conditions
      </h1>
      <ol className="list-decimal text-blue-900 font-bold m-4">
        {terms.map((term, i) => (
          <li key={i}>{term.description}</li>
        ))}
      </ol>
    </main>
  );
};

export default page;
