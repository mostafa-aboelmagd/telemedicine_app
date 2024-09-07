"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import userImage from "@/images/user.png";
import InputComponent from "@/components/auth/InputComponent";
import Link from "next/link";

function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "Example",
    lastName: "Example",
    phone: "+201111111111",
    email: "Example@gmail.com",
    gender: "Male",
    birthYear: "2000",
    });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthYear: "",
    });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevForm) => ({...prevForm, [name]: type === "checkbox" ? checked : value,}));
    setChangedField(() => (name));
  };

  const validateFieldsChosen = () => {
    for(let key in formData) {
      if(!(formData[key as keyof typeof formData])) {
        return false;
      }
    }
    return true;
  };

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if(formData.firstName && (!regex.test(formData.firstName))) {
      if(errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, firstName: "First Name Can't Contain Numbers",}));
    }

    else {
      if(errorMessage.firstName !== "") {
        changedValidation = true; 
      }
      setErrorMessage((prevError) => ({...prevError, firstName: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm}));  // Extra rerender needed to correct the current input error status
    }
  };

  const validateLastName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;
    if(formData.lastName && (!regex.test(formData.lastName))) {
      if(errorMessage.lastName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, lastName: "Last Name Can't Contain Numbers",}));
    }

    else {
      if(errorMessage.lastName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, lastName: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let changedValidation = false;
    if(formData.email && (!emailPattern.test(formData.email))) {
      if(errorMessage.email === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, email: "Email Is Invalid",}));
    }

    else {
      if(errorMessage.email !== "") {
          changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, email: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validatePhone = () => {
    const phonePattern = /^\+201(0|1|2|5)(\d{8})$/;
    let changedValidation = false;
    if(formData.phone && ((!phonePattern.test(formData.phone)) || formData.phone.length != 13)) {
      if(errorMessage.phone === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, phone: "Current Phone Number Isn't valid !",}));
    }

    else {
      if(errorMessage.phone !== "") {
          changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, phone: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateBirthYear = () => {
    let changedValidation = false;

    if(formData.birthYear && (Number(formData.birthYear) < 1900 || Number(formData.birthYear) > 2011)) {
      if(errorMessage.birthYear === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, birthYear: "Age Isn't Valid",}));
    } 

    else {
      if(errorMessage.birthYear !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, birthYear: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateForm = () => {
    switch(changedField) {
      case "firstName":
        validateFirstName();
        break;

      case "lastName":
        validateLastName();
        break;

      case "email":
        validateEmail();
        break;

      case "phone":
        validatePhone();
        break;

      case "birthYear":
        validateBirthYear();
        break;

      default:
        break;
    }

    setChangedField(() => "");

    if(validateFieldsChosen()) {
      for(let key in errorMessage) {
        if(errorMessage[key as keyof typeof errorMessage] !== "") {
          setFormValid(() => (false));
          return;
        }
      }
      setFormValid(() => (true));
    }
    else {
      setFormValid(() => (false));
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

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
        <form>
          <div className="flex pt-4 mb-3">
              <Link href="/patientProfile/view" className="text-blue-500 font-bold ml-7">Personal Information</Link>
              <Link href="/patientProfile/paymentInfo" className="font-bold ml-7 mr-7 md:mr-0">Payment Information</Link>
          </div>
          <div className="flex">
              <hr className="bg-blue-500 border-none h-0.5 w-1/2 md:min-w-52"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/2 md:min-w-52"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-0 md:w-full"></hr>
          </div>
          <div className="p-7">
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">First Name</p>
                  <InputComponent
                    label=""
                    type="text"
                    name="firstName"
                    placeholder="Enter New First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    errorText={errorMessage.firstName}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Last Name</p>
                  <InputComponent
                    label=""
                    type="text"
                    name="lastName"
                    placeholder="Enter New Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    errorText={errorMessage.lastName}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Phone Number</p>
                  <InputComponent
                    label=""
                    type="tel"
                    name="phone"
                    placeholder={formData.phone ? formData.phone : "+20 XXXX XXX XXX"}
                    value={formData.phone}
                    onChange={handleChange}
                    errorText={errorMessage.phone}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Email</p>
                  <InputComponent
                    label=""
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    errorText={errorMessage.email}
                  />
              </div>
              <div className="mb-3">
                  <p className="font-semibold">Gender</p>
                  <div className="flex gap-8">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        className="radio align-middle mb-[3px] mr-1"
                        checked={formData.gender === "Male"}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        className="radio align-middle mb-[3px] mr-1"
                        checked={formData.gender === "Female"}
                      />
                      Female
                    </label>
                  </div>
              </div>
              <div className="mb-4 max-w-80">
                  <p className="font-semibold">Year Of Birth</p>
                  <InputComponent
                    label=""
                    type="number"
                    name="birthYear"
                    placeholder="Enter Birth Year"
                    value={formData.birthYear}
                    onChange={handleChange}
                    errorText={errorMessage.birthYear}
                  />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
                  disabled={!formValid}
                >
                  Save Changes
                </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
