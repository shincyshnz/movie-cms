import React, { useEffect } from "react";
import { useError } from "../context/ErrorContext";

const Error = ({ errorKey }) => {
  const { errorObj } = useError();

  return (
    <div className="bg-transparent text-red-700 p-2 mx-4 mb-3" role="alert">
      <p className="font-bold">{errorObj[errorKey]}</p>
    </div>
  );
};

export default Error;
