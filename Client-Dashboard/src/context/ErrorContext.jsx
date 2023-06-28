import React, { createContext, useContext, useState } from "react";

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const [errorObj, setErrorObj] = useState({});

  const handleErrorObj = (errorKey, errorMsg) => {
    setErrorObj((prev) => ({
      ...prev,
      [errorKey]: errorMsg,
    }));
  };

  return (
    <ErrorContext.Provider value={{ errorObj, handleErrorObj }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hooks
export const useError = () => {
  return useContext(ErrorContext);
};
