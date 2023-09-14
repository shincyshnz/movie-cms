import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";
import FormContainer from "./FormContainer";
import Button from "./Button";

export const OTP = ({ userData }) => {
  const inputRef = useRef({});
  const [resetPassword, setResetPassword] = useState(false);
  const initialInput = {
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  };
  const [otp, setOtp] = useState(initialInput);

  const [countDown, setCountDown] = useState(0);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  let timerId;

  const timer = () => {
    setCountDown(60 * 2);
    timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
  };

  useEffect(() => {
    inputRef.current[0].focus();
    timer();

    return () => clearInterval(timerId);
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
        className="block mb-2 text-xl font-medium text-gray-900 w-1/6 outline outline-2 outline-gray-400 rounded-sm px-5 py-5 focus:outline-gray-950 disabled:outline-gray-400"
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
    if (otpFull.length !== 6) {
      toast.error("OTP field cannot be empty!");
      return;
    }

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
      }
    } catch (error) {
      error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error(error.message);
    } finally {
      clearInterval(timerId);
      setCountDown(0);
      setOtp(initialInput);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast.loading("Please wait...");
      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/send-otp`,
        {
          method: "POST",
          data: {
            email: userData.email,
          },
        }
      );

      if (response.status === 200) {
        timer();
        setOtp(initialInput);
        toast.update(toastId, {
          render: `An OTP has been send to ${response.data.email}`,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {resetPassword ? (
        <ResetPassword userData={userData} />
      ) : (
        <FormContainer>
          <h1 className="text-4xl font-medium pb-3">Verify Email</h1>
          <p className="text-slate-500">Enter the OTP send to your email.</p>
          <div className="flex gap-3 justify-center mt-8">
            {renderInputs()}
          </div>
          <Button type="button" onClick={handleSubmit} text="Verify OTP" />
          {countDown > 0 ? (
            <p className="text-center mt-2">
              The OTP will expire in{" "}
              <strong>
                <span className="text-lg text-red-600">
                  {minutes}:{seconds}
                </span>
              </strong>
            </p>
          ) : (
            <p className="text-center mt-2">
              Don't recieve code?
              <button
                onClick={handleResendOtp}
                className="text-violet-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Resend OTP</span>
              </button>
            </p>
          )}
        </FormContainer>
      )}

    </>
  );
};
