import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storeToken = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("x-token", token);
  };

  const getToken = () => {
    return localStorage.getItem("x-token");
  };

  const removeToken = () => {
    setIsAuthenticated(false);
    // localStorage.removeItem("x-token");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ storeToken, getToken, removeToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
