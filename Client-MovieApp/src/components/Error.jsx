import React from "react";
import { useError } from "../context/ErrorContext";

const Error = ({ errorKey }) => {
  const { errorObj } = useError(); 
  return (
    <div className="bg-transparent text-red-700 p-2 mx-4 mb-3" role="alert">
      {errorObj?.map((err, index) => {
        return (
          <p className="font-bold" key={index}>
            {err[errorKey]}
          </p>
        );
      })}
    </div>
  );
};

export default Error;
