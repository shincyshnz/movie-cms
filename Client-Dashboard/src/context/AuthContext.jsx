import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const storeToken = (token) => {
    localStorage.setItem("x-token", token);
  };

  const getToken = () => {
    return localStorage.getItem("x-token");
  };

  const removeToken = () => {
    localStorage.removeItem("x-token");
  };

  return (
    <AuthContext.Provider value={{ storeToken,getToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
