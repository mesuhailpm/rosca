'use client'
import { ChangeEvent, useState } from 'react';
import { AdminModelType, Participants, RoscaType } from '@types';
import { useStore } from '@src/store';
export type CustomRosca = Omit <RoscaType, 'admins' | 'participants' > & {
    _id: string
    admins: AdminModelType[],
    participants: Participants
  }

const RoscaElement = ({
  order,
  scheme,
  setSchemes,
}: {
  order: number;
  scheme: CustomRosca;
  setSchemes: React.Dispatch<React.SetStateAction<CustomRosca[]>>;
}) => {
  const { startResponseLoading, runConfirmation, endResponseLoading } = useStore();
  const [captcha, setCaptcha] = useState<{ _id: string; numbers: number[]; result?: number }>({ _id: '', numbers: [] });
  const [userInput, setUserInput] = useState<number>();

  const handleSubmit = () => {
    setCaptcha((prev) => ({ ...prev, result: userInput }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(Number(e.currentTarget.value));
    setCaptcha((prev) => ({ ...prev, result: undefined }));
  };

  const handleDeleteScheme = async (id: string) => {
    try {
      startResponseLoading();
      const { token } = JSON.parse(localStorage.getItem('userObject') || '');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await fetch('/api/superadmin/schemes', {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers,
      });

      const { message, success = false }: { message: string; success: boolean } = await res.json();

      if (!success) throw new Error(message);
      runConfirmation({ message, success });
      setSchemes((prev) => prev?.filter((el) => el._id !== id) || []);
      setCaptcha({ _id: '', numbers: [] });
    } catch (error: any) {
      runConfirmation({ message: error.message || 'Something went wrong!', success: false });
    } finally {
      endResponseLoading();
    }
  };

  const generateCaptcha = (_id: string) => {
    setCaptcha({ _id, numbers: [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)] });
  };

  const isAnswerCorrect = () => {
    return captcha?.numbers.reduce((a, b) => a + b) === captcha?.result;
  };

  const { admins, participants, _id, name } = scheme;

  const maxLength = Math.max(admins.length, participants.length);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex items-center">
        <h3 className="text-xl font-bold uppercase m-[1rem]">{order}. {name}</h3>
        <button
          className={`hover:flex active:flex h-fit hover:px-1 active:px-1 active:items-center hover:items-center group active:bg-red-500 a hover:bg-red-500 ${_id === captcha._id ? 'hidden' : ''} text-white font-semibold hover:ring-2 ring-yellow-300 hover:text-black`}
          onClick={() => generateCaptcha(_id)}
        >
          <i className="fa-solid fa-trash text-xs m-2"></i>
          <p className="hidden group-active:block group-hover:block">Delete The Scheme</p>
        </button>
      </div>

      {captcha._id === _id && (
        <div className="flex text-[1rem] items-center mt-4 bg-slate-200 text-black p-4 rounded-lg shadow-md">
          <p className="mr-2 font-semibold">Please enter the answer: </p>
          <p className="mr-2 font-semibold">{captcha?.numbers[0]} + {captcha?.numbers[1]} = </p>
          <input
            autoFocus
            type="number"
            value={userInput || ""}
            onChange={handleInputChange}
            className="w-[4rem] text-black inline outline-none bg-slate-400 p-2 rounded-md shadow-sm"
          />
          <button
            className="m-1 bg-red-500 text-white font-semibold p-2 rounded-sm hover:bg-red-600 transition-all duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="m-1 bg-yellow-800 text-white font-semibold p-2 rounded-sm hover:bg-red-600 transition-all duration-200"
            onClick={() => setCaptcha((prev) => ({ ...prev, _id: '' }))}
          >
            Cancel
          </button>

          {(!isAnswerCorrect() && userInput && captcha.result) && (
            <p className="text-red-500 text-sm mt-2">Incorrect answer, please try again.</p>
          )}

          {isAnswerCorrect() && (
            <button
              className="absolute left-1/2 transform -translate-x-1/2 bg-red-500 p-2 rounded-sm text-white font-semibold shadow-lg transition-all duration-200 hover:ring-2 hover:text-red-500 hover:bg-black"
              onClick={() => handleDeleteScheme(_id)}
            >
              Delete The Scheme Permanently
            </button>
          )}
        </div>
      )}

      <table className="text-left m-[1rem]">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Admins</th>
            <th className="border-b-2 p-2">Members</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxLength }).map((_, index) => (
            <tr key={index}>
              <td className="p-2">{admins[index] ? admins[index].userName : ''}</td>
              <td className="p-2">{participants[index] ? participants[index].name : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoscaElement;
