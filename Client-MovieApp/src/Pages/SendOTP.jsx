import React, { useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";
import { toast } from "react-toastify";
import axios from "axios";
import { OTP } from "../components/OTP";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";

const SendOTP = () => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();
  const [input, setInput] = useState({
    email: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    id: "",
  });
  const [isConfirmOTP, setIsConfirmOTP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorObj.length > 0) return;

    deleteErrorObj("emailPassword");

    if (!input.email) {
      return handleErrorObj("emailPassword", "Email Cannot be empty");
    }

    try {
      const toastId = toast.loading("Please wait...");
      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/send-otp`,
        {
          method: "POST",
          data: {
            email: input.email,
          },
        }
      );

      if (response.status === 200) {
        setUserData(
          (prev) =>
            (prev = {
              email: response.data.email,
              id: response.data.userId,
            })
        );

        toast.update(toastId, {
          render: `An OTP has been send to ${response.data.email}`,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setIsConfirmOTP((prev) => (prev = true));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   const value = e.target.value;
  //   deleteErrorObj("emailPassword");

  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   if (!value || !emailRegex.test(value)) {
  //     return handleErrorObj("emailPassword", "Please enter a valid email");
  //   }
  //   setEmail((prev) => (prev = value));
  // };

  return (
    <>
      {isConfirmOTP ? (
        <OTP userData={userData} />
      ) : (
        <FormContainer>
          <h1 className="text-4xl font-medium pb-3">Verify Email</h1>
          <p className="text-slate-500">
            Enter your email address, and we'll send you a link to get back into
            your account.
          </p>

          <Input
            name={"email"}
            labelName={"Email"}
            type={"email"}
            placeholder={"Enter email address"}
            input={input}
            setInput={setInput}
          />
          {errorObj?.map((err, index) => {
            return err.email && <Error errorKey="email" key={index} />;
          })}

          <Button type={"button"} onClick={handleSubmit} text={"Send OTP"} />

          <p className="text-center mt-4">
            Not registered yet?
            <a
              href="/register"
              className="text-violet-600 font-medium inline-flex space-x-1 items-center"
            >
              <span className="ps-1.5"> Register now </span>
              <span>
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </a>
          </p>
          <p className="text-center mt-2">
            <a
              href="/login"
              className="text-violet-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Back to Login</span>
            </a>
          </p>
        </FormContainer>
      )}
    </>
  );
};

export default SendOTP;
