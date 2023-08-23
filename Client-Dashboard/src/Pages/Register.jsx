import React, { useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const naviagte = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(e);

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    deleteErrorObj(name);
    deleteErrorObj("confirmPassword");

    switch (name) {
      case "email":
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        !value ||
          (!emailRegex.test(value) &&
            handleErrorObj(name, "Please enter a valid email."));
        break;

      case "password":
        !value && handleErrorObj(name, "Please Enter Password.");
        input.confirmPassword !== value &&
          handleErrorObj(
            "confirmPassword",
            "Password and Confirm password doesnot match."
          );
        break;

      case "confirmPassword":
        !value && handleErrorObj(name, "Please Confirm Password.");
        input.password !== value &&
          handleErrorObj(name, "Password and Confirm password doesnot match.");
        break;

      default:
        break;
    }
    return;
  };

  const handleSubmit = async () => {
    if (errorObj.length > 0) return;

    try {
      const toastId = toast.loading("Please Wait...");

      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/register`,
        {
          method: "POST",
          data: input,
        }
      );

      if (response.status === 200) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onChange: () => naviagte("/") 
        });
      }

    } catch (error) {
      toast.dismiss();
      handleErrorObj(
        "apiError",
        `${error.message} ${error.response?.data.message}`
      );
    }finally{
      deleteErrorObj("apiError");
    }
  };

  return (
    <div className="w-full min-h-screen max-w-xs m-auto pt-16">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          {errorObj?.map((err, index) => {
            return err.email && <Error errorKey="email" key={index} />;
          })}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-violet-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
            autoComplete="off"
          />
          {errorObj?.map((err, index) => {
            return err.password && <Error errorKey="password" key={index} />;
          })}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border border-violet-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="******************"
            value={input.confirmPassword}
            onChange={onInputChange}
            onBlur={validateInput}
            autoComplete="off"
          />
          {errorObj?.map((err, index) => {
            if (err.confirmPassword)
              return <Error errorKey="confirmPassword" key={index} />;
            if (err.apiError) return <Error errorKey="apiError" key={index} />;
          })}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-between pt-3">
          <p className="text-violet-500 text-xs italic">
            Already have an account?&nbsp;
            <a
              className="inline-block align-baseline font-bold text-sm text-violet-500 hover:text-violet-800"
              href="/"
            >
              Login
            </a>
          </p>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 TMDB Corp. All rights reserved.
      </p>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Register;
