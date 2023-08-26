import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedRoute = ({ children }) => {
  const { getToken } = useAuth();
  const token = getToken();

  if (!token) {
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
