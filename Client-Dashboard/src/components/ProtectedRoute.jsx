import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    if (localStorage.getItem("userRole") === "admin") {
      return (
        <>
          <SideBar />
          <Outlet />
        </>
      );
    }else {
      return (window.location.href = "http://localhost:5173/");
    }
  } 
  return <Navigate to="/login" replace />;

};

export default ProtectedRoute;
