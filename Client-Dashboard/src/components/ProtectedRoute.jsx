import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
