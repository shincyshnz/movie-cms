import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { getToken } = useAuth();

  if (localStorage.getItem("userRole") === "user") {
    const token = getToken();
    
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (window.location.href = "http://localhost:5174/dashboard");
  }
};

export default ProtectedRoute;
