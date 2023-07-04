import React, { createContext, useContext, useState } from "react";

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const [errorObj, setErrorObj] = useState([]);

  const handleErrorObj = (errorKey, errorMsg) => {
    setErrorObj((prev) => [
      ...prev,
      {
        [errorKey]: errorMsg,
      },
    ]);
  };

  const deleteErrorObj = (errorKey) => {
    setErrorObj((prev) => prev.filter((err) => !err.hasOwnProperty(errorKey)));
  };

  return (
    <ErrorContext.Provider value={{ errorObj, handleErrorObj, deleteErrorObj }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hooks
export const useError = () => {
  return useContext(ErrorContext);
};
