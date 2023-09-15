import React, { useState } from "react";
import { useError } from "../context/ErrorContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { storeToken } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { errorObj, handleErrorObj, deleteErrorObj } = useError();
  const navigate = useNavigate();

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
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    deleteErrorObj(name);
    deleteErrorObj("apiError");

    switch (name) {
      case "email":
        !value ||
          (!emailRegex.test(value) &&
            handleErrorObj(name, "Please enter a valid email."));
        break;

      case "password":
        !value && handleErrorObj(name, "Please Enter Password.");
        break;
    }
    return;
  };

  const handleSubmit = async () => {
    if (errorObj.length > 0) return;

    try {
      const response = await axios(`${import.meta.env.VITE_AUTH_URL}/login`, {
        method: "POST",
        data: input,
      });

      // Store Access Token in localstorage
      if (response.status === 200) {
        storeToken(response.data.accessToken); 
        localStorage.setItem("userRole", response.data.userRole);
        navigate("/dashboard" , {replace :true});
      }
    } catch (error) {
      handleErrorObj("apiError", error.response.data?.message || error.message);
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
            if(err.apiError){
              return err.apiError && <Error errorKey="apiError" key={index} />;
            }           
            return err.password && <Error errorKey="password" key={index} />;
          })}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-violet-500 hover:text-violet-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        <div className="flex items-center justify-between pt-3">
          <p className="text-violet-500 text-xs italic">
            New User?&nbsp;
            <a
              className="inline-block align-baseline font-bold text-sm text-violet-500 hover:text-violet-800"
              href="/register"
            >
              Register
            </a>
          </p>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 TMDB Corp. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
