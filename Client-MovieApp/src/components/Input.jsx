import React from "react";
import { useError } from "../context/ErrorContext";

const Input = ({
  name,
  labelName,
  type,
  placeholder,
  autoComplete = "on",
  input,
  setInput
}) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    deleteErrorObj("apiError");
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
      case "username":
        !value && handleErrorObj(name, "Please enter a valid username.");
        break;

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

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {labelName}
      </label>
      <input
        className="shadow appearance-none border border-violet-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={input[name]}
        onChange={onInputChange}
        onBlur={validateInput}
        autoComplete={autoComplete}
      />
    </>
  );
};

export default Input;
