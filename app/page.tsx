'use client';
import { useStore } from '@src/store';
import {  State } from '@types';
import { noto_serif_malayalam } from '@fonts'
import Link from 'next/link';


const Home =  () => {

  const { isLoggedIn, adminLoading } = useStore() as State

  if (!isLoggedIn && !adminLoading) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col items-center text-white pt-4  h-full">
      <h1 className="font-bold text-3xl" style={{ textShadow: 'rgb(209, 195, 172) 4px 0px 0px, rgb(209, 195, 172) 3.87565px 0.989616px 0px, rgb(209, 195, 172) 3.51033px 1.9177px 0px, rgb(209, 195, 172) 2.92676px 2.72656px 0px, rgb(209, 195, 172) 2.16121px 3.36588px 0px, rgb(209, 195, 172) 1.26129px 3.79594px 0px, rgb(209, 195, 172) 0.282949px 3.98998px 0px, rgb(209, 195, 172) -0.712984px 3.93594px 0px, rgb(209, 195, 172) -1.66459px 3.63719px 0px, rgb(209, 195, 172) -2.51269px 3.11229px 0px, rgb(209, 195, 172) -3.20457px 2.39389px 0px, rgb(209, 195, 172) -3.69721px 1.52664px 0px, rgb(209, 195, 172) -3.95997px 0.56448px 0px, rgb(209, 195, 172) -3.97652px -0.432781px 0px, rgb(209, 195, 172) -3.74583px -1.40313px 0px, rgb(209, 195, 172) -3.28224px -2.28625px 0px, rgb(209, 195, 172) -2.61457px -3.02721px 0px, rgb(209, 195, 172) -1.78435px -3.57996px 0px, rgb(209, 195, 172) -0.843183px -3.91012px 0px, rgb(209, 195, 172) 0.150409px -3.99717px 0px, rgb(209, 195, 172) 1.13465px -3.8357px 0px, rgb(209, 195, 172) 2.04834px -3.43574px 0px, rgb(209, 195, 172) 2.83468px -2.82216px 0px, rgb(209, 195, 172) 3.44477px -2.03312px 0px, rgb(209, 195, 172) 3.84068px -1.11766px 0px, rgb(209, 195, 172) 3.9978px -0.132717px 0px', fontFamily: noto_serif_malayalam.className }}></h1>

      <h1 className="text-red-800 font-bold text-2xl pt-4 font-raleway" style={{ textShadow: 'rgb(43, 191, 255) 4px 0px 0px, rgb(43, 191, 255) 3.87565px 0.989616px 0px, rgb(43, 191, 255) 3.51033px 1.9177px 0px, rgb(43, 191, 255) 2.92676px 2.72656px 0px, rgb(43, 191, 255) 2.16121px 3.36588px 0px, rgb(43, 191, 255) 1.26129px 3.79594px 0px, rgb(43, 191, 255) 0.282949px 3.98998px 0px, rgb(43, 191, 255) -0.712984px 3.93594px 0px, rgb(43, 191, 255) -1.66459px 3.63719px 0px, rgb(43, 191, 255) -2.51269px 3.11229px 0px, rgb(43, 191, 255) -3.20457px 2.39389px 0px, rgb(43, 191, 255) -3.69721px 1.52664px 0px, rgb(43, 191, 255) -3.95997px 0.56448px 0px, rgb(43, 191, 255) -3.97652px -0.432781px 0px, rgb(43, 191, 255) -3.74583px -1.40313px 0px, rgb(43, 191, 255) -3.28224px -2.28625px 0px, rgb(43, 191, 255) -2.61457px -3.02721px 0px, rgb(43, 191, 255) -1.78435px -3.57996px 0px, rgb(43, 191, 255) -0.843183px -3.91012px 0px, rgb(43, 191, 255) 0.150409px -3.99717px 0px, rgb(43, 191, 255) 1.13465px -3.8357px 0px, rgb(43, 191, 255) 2.04834px -3.43574px 0px, rgb(43, 191, 255) 2.83468px -2.82216px 0px, rgb(43, 191, 255) 3.44477px -2.03312px 0px, rgb(43, 191, 255) 3.84068px -1.11766px 0px, rgb(43, 191, 255) 3.9978px -0.132717px 0px' }}>Participants</h1>
      <h1
      className={`text-3xl font-extrabold bg-gradient-to-r from-slate-900 to-teal-400 dark:from-red-400 dark:via-orange-500 dark:to-yellow-400 inline-block text-transparent bg-clip-text ${noto_serif_malayalam.className} text-4xl`} > ഇത് നമ്മുടെ കുറി</h1>
      {isLoggedIn && <Link href={'/admin/dashboard/schemes'} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">View Schemes</Link>}
      {adminLoading && <h4>Loading your access...</h4> }
    </div>
  );
}

export default Home
