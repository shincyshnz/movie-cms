import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";

export const OTP = ({ userData }) => {
  const inputRef = useRef({});
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (/[a-z]/gi.test(value)) return;

    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackSpace = (event, index) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInputs = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        className="block mb-2 text-xl font-medium text-gray-900 dark:text-white w-1/6 outline outline-2 outline-gray-400 rounded-sm px-5 py-5 focus:outline-gray-950 disabled:outline-gray-400"
        type="text"
        name={keys}
        ref={(element) => (inputRef.current[index] = element)}
        key={index}
        value={otp[keys]}
        maxLength="1"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
      />
    ));
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    const otpFull = Object.values(otp).join("");

    try {
      // send otp to verify
      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/verify-otp`,
        {
          method: "POST",
          data: {
            otp: otpFull,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Your account has been verified. Reset your password.");
        setResetPassword((prev) => (prev = true));
        // navigate("/reset-password", { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {resetPassword ? (
        <ResetPassword userData={userData}/>
      ) : (
        <form className="p-5 w-full md:mx-40 md:w-1/2 xl:w-1/4">
          <div className="flex flex-col items-center p-5 mt-40 md:gap-2 bg-white rounded-lg max-h-screen ">
            <h1 className="text-4xl font-medium pb-3">Verify Email</h1>
            <p className="text-slate-500">Enter the OTP send to your email.</p>
            <div className="flex gap-3 justify-center mt-8">
              {renderInputs()}
            </div>
            <button
              className="w-full bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              verify OTP
            </button>
          </div>
        </form>
      )}
    </>
  );
};
