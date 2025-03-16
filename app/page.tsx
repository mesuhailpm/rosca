'use client';
import { useStore } from '@src/store';
import {  State } from '@types';
import { noto_serif_malayalam } from '@fonts'
import Link from 'next/link';


const Home =  () => {

  const { isLoggedIn, adminLoading } = useStore() as State

  if (!isLoggedIn && !adminLoading) {
    return (<>
        <h1       className={`text-3xl text-center font-extrabold bg-gradient-to-r from-slate-900 to-teal-400 dark:from-red-400 dark:via-orange-500 dark:to-yellow-400 inline-block text-transparent bg-clip-text ${noto_serif_malayalam.className} text-4xl`} > ഇത് നമ്മുടെ കുറി</h1>
      <div className="flex flex-col items-center pt-4 bg-blue-200/[0.7] h-full">

        <h1 className="text-2xl  font-semibold">Please log in to view the listed Schemes.</h1>
        <p className=" mt-4 text-center max-w-lg">
          ROSCA (Rotating Savings and Credit Association) is a group of individuals who come together to save and borrow collectively. Each member contributes a fixed amount of money to a common fund, which is then given to one member of the group on a rotating basis. This system helps members save money and access funds when needed.
        </p>
        <p className=" mt-4 text-center max-w-lg">
          To participate in ROSCA and view the available schemes, please log in with your credentials. If you do not have an account, you can sign up to join our community and start benefiting from the collective savings and credit system.
        </p>
        <Link href={'/admin/go/login'} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Log In
        </Link>
      </div>
    </>
    );
  }

  return (
    <div className="flex flex-col items-center text-white pt-4  h-full">

      <h1
      className={`text-3xl font-extrabold bg-gradient-to-r from-slate-900 to-teal-400 dark:from-red-400 dark:via-orange-500 dark:to-yellow-400 inline-block text-transparent bg-clip-text ${noto_serif_malayalam.className} text-4xl`} > ഇത് നമ്മുടെ കുറി</h1>
      {isLoggedIn && <Link href={'/admin/dashboard/schemes'} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">View Schemes</Link>}
      {adminLoading && <h4>Loading your access...</h4> }
    </div>
  );
}

export default Home
