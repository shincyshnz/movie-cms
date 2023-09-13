import React, { useState } from "react";
import FormContainer from "./FormContainer";
import Input from "./Input";
import Button from "./Button";
import { useError } from "../context/ErrorContext";
import Error from "./Error";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ userData }) => {
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/reset-password`,
        {
          method: "POST",
          data: {
            password: input.password,
            userId: userData.id,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-4xl font-medium pb-3">Reset Password</h1>
      <p className="text-slate-500 mb-3">
        Reset your password and login to your account with new password.
      </p>
      <Input
        name={"password"}
        labelName={"Password"}
        type={"password"}
        placeholder={"********"}
        input={input}
        setInput={setInput}
        autoComplete="off"
      />

      <Input
        name={"confirmPassword"}
        labelName={"Confirm Password"}
        type={"password"}
        placeholder={"********"}
        input={input}
        setInput={setInput}
        autoComplete="off"
      />

      {errorObj?.map((err, index) => {
        if (err.confirmPassword)
          return <Error errorKey="confirmPassword" key={index} />;
        if (err.apiError) return <Error errorKey="apiError" key={index} />;
        if (err.password) return <Error errorKey="password" key={index} />;
      })}
      <Button type={"button"} onClick={handleSubmit} text={"Reset Password"} />
    </FormContainer>
  );
};

export default ResetPassword;
