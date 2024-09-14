"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputComponent from "./InputComponent";

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthYear: "",
    gender: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthYear: "",
  });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const formFields = [
    { name: "firstName", title: "First Name", type: "text" },
    { name: "lastName", title: "Last Name", type: "text" },
    { name: "email", title: "Email", type: "email" },
    { name: "phone", title: "Phone Number", type: "tel" },
    { name: "password", title: "Password", type: "password" },
    { name: "confirmPassword", title: "Confirm Password", type: "password" },
    { name: "birthYear", title: "Birth Year", type: "number" },
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 text-lg	p-3.5	w-full border-none rounded-lg cursor-pointer transition-[background-color]",
    "disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500",
  ].join(" ");

  const validateFieldsChosen = () => {
    for (let key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if (formData.firstName && !regex.test(formData.firstName)) {
      if (errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        firstName: "First Name Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.firstName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, firstName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateLastName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;
    if (formData.lastName && !regex.test(formData.lastName)) {
      if (errorMessage.lastName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        lastName: "Last Name Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.lastName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, lastName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let changedValidation = false;
    if (formData.email && !emailPattern.test(formData.email)) {
      if (errorMessage.email === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        email: "Email Is Invalid",
      }));
    } else {
      if (errorMessage.email !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, email: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePassword = () => {
    let passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let changedValidation = false;
    if (
      !formData.password ||
      (formData.password && passwordPattern.test(formData.password))
    ) {
      if (errorMessage.password !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, password: "" }));
    } else {
      if (errorMessage.password === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        password:
          "Password Must Contain 8+ Characters Including Atleast 1 Number, 1 Character, 1 Symbol",
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateConfirmPassword = () => {
    let changedValidation = false;

    if (
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      if (errorMessage.confirmPassword === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        confirmPassword: "Passwords Don't Match",
      }));
    } else {
      if (errorMessage.confirmPassword !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, confirmPassword: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePhone = () => {
    const phonePattern = /^\+201(0|1|2|5)(\d{8})$/;
    let changedValidation = false;
    if (
      formData.phone &&
      (!phonePattern.test(formData.phone) || formData.phone.length != 13)
    ) {
      if (errorMessage.phone === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        phone: "Current Phone Number Is Not valid!",
      }));
    } else {
      if (errorMessage.phone !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, phone: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateBirthYear = () => {
    let changedValidation = false;

    if (
      formData.birthYear &&
      (Number(formData.birthYear) < 1900 || Number(formData.birthYear) > 2011)
    ) {
      if (errorMessage.birthYear === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        birthYear: "Age Is Not Valid",
      }));
    } else {
      if (errorMessage.birthYear !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, birthYear: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateForm = () => {
    switch (changedField) {
      case "firstName":
        validateFirstName();
        break;

      case "lastName":
        validateLastName();
        break;

      case "email":
        validateEmail();
        break;

      case "password":
        validatePassword();
        validateConfirmPassword();
        break;

      case "confirmPassword":
        validateConfirmPassword();
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

    if (validateFieldsChosen()) {
      for (let key in errorMessage) {
        if (errorMessage[key as keyof typeof errorMessage] !== "") {
          setFormValid(() => false);
          return;
        }
      }
      setFormValid(() => true);
    } else {
      setFormValid(() => false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setChangedField(() => name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      fName: formData.firstName,
      lName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      birthYear: parseInt(formData.birthYear),
      gender: formData.gender,
      role: "Patient",
    };

    try {
      const response = await fetch(
        "https://telemedicine-pilot-d2anbuaxedbfdba9.southafricanorth-01.azurewebsites.net/patient/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          mode: "cors",
        }
      );

      // Log the full response for debugging purposes
      console.log("Full response:", response);

      // If the response is not OK, log the error details
      if (!response.ok) {
        const errorData = await response.json(); // Expecting the server to return JSON error details
        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to register");
      }

      // If the response is OK, handle the successful registration
      const data = await response.json();
      console.log("User registered successfully:", data);

      // Redirect to home or login after successful registration
      window.location.href = "/";
    } catch (error) {
      console.error("Error during signup:  ", error);
    }
  };

  return (
    <div className="p-5 rounded-xl max-w-md m-auto">
      <h2 className="font-bold text-2xl text-center text-neutral-700 mb-6">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => {
          return (
            <InputComponent
              key={field.name}
              label={field.title}
              type={field.type}
              name={field.name}
              placeholder={
                field.name === "phone" && !formData.phone
                  ? "+20 XXXX XXX XXX"
                  : `Enter ${field.title}`
              }
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              errorText={errorMessage[field.name as keyof typeof errorMessage]}
              required
              additionalText={
                field.name === "phone" && !errorMessage.phone
                  ? "Please Enter A Valid Phone Number"
                  : ""
              }
            />
          );
        })}
        <div className="mb-4">
          <label className="block text-base mb-1.5 font-semibold text-neutral-700">
            Gender *
          </label>
          <div className="flex gap-8">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="radio align-middle mb-[3px] mr-1"
                checked={formData.gender === "Male"}
                required
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
        <p className="mb-2">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-500 font-semibold cursor-pointer"
          >
            Sign in
          </Link>
        </p>
        <button
          type="submit"
          className="bg-sky-500 text-neutral-50 text-lg	p-3.5	w-full border-none rounded-lg cursor-pointer transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
          disabled={!formValid}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;