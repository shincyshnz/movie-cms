import React, { useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OTP } from "../components/OTP";

const SendOTP = () => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({
    email:"",
    id:""
  });
  const [isConfirmOTP, setIsConfirmOTP] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorObj.length > 0) return;

    deleteErrorObj("emailPassword");

    if (!email) {
      return handleErrorObj("emailPassword", "Email Cannot be empty");
    }

    try {
      const toastId = toast.loading("Please wait...");
      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/send-otp`,
        {
          method: "POST",
          data: {
            email,
          },
        }
      );

      if (response.status === 200) {
        setUserData(prev=>
          prev  = {
          email : response.data.email,
          id: response.data.userId
        });

        toast.update(toastId, {
          render: `An OTP has been send to ${response.data.email}`,
          type: "success",
          isLoading: false,
          autoClose:2000,
        });
        setIsConfirmOTP((prev) => (prev = true));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    deleteErrorObj("emailPassword");

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!value || !emailRegex.test(value)) {
      return handleErrorObj("emailPassword", "Please enter a valid email");
    }
    setEmail((prev) => (prev = value));
  };

  return (
    <>
      {isConfirmOTP ? <OTP userData ={userData}/> : <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium pb-3">Verify Email</h1>
        <p className="text-slate-500">
          Enter your email address, and we'll send you a link to get back into
          your account.
        </p>

        <form className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                onChange={handleInputChange}
              />
            </label>

            {errorObj?.map((err, index) => {
              return (
                err.emailPassword && (
                  <Error errorKey="emailPassword" key={index} />
                )
              );
            })}

            {/* <button className="w-full py-3 font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg border-violet-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Reset password</span>
          </button> */}

            <button
              className="bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Send OTP
            </button>

            <p className="text-center">
              Not registered yet?
              <a
                href="/register"
                className="text-violet-600 font-medium inline-flex space-x-1 items-center"
              >
                <span className="ps-1.5"> Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
            <p className="text-center">
              <a
                href="/login"
                className="text-violet-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Back to Login</span>
              </a>
            </p>
          </div>
        </form>
      </div>}
    </>
  );
};

export default SendOTP;
