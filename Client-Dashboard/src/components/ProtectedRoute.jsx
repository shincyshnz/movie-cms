import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
