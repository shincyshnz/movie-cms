import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  
  const storeToken = (token) => {
    setToken(token);
    localStorage.setItem("x-token", token);
  };

  const removeToken = () => {
    localStorage.removeItem("x-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, storeToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
