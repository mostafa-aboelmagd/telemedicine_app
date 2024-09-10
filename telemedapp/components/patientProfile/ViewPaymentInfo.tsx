"use client";

import Image from "next/image";
import userImage from "@/images/user.png";
import Link from "next/link";

function ViewPaymentInfo() {
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
        <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
        <p className="text-blue-500 mb-1 font-semibold">FirstName LastName</p>
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fill-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
          </svg>
          <p>Wallet</p>
          <p className="text-green-500">(0)</p>
        </div>
      </div>
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex pt-4 mb-3">
          <Link href="/patientProfile/view" className="font-bold ml-7 w-1/4">Personal Information</Link>
          <Link href="/patientProfile/paymentInfo" className="text-blue-500 font-bold ml-7 mr-7 md:mr-0 w-1/4">Payment Information</Link>
          <Link href="/patientProfile/prescriptions" className="font-bold ml-7 w-1/4">Prescriptions</Link>
          <Link href="/patientProfile/patientDocuments" className="font-bold ml-7 mr-7 md:mr-0 w-1/4">Documents</Link>
        </div>
        <div className="flex">
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-blue-500 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>

        </div>
        <div className="p-7">
          <p className="font-semibold">You don't have any saved payment information</p>
        </div>
      </div>
    </div>
  );
}

export default ViewPaymentInfo;
