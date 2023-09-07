import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import WatchLater from "./components/WatchLater";
import SendOTP from "./Pages/SendOTP";

function App() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen justify-center items-start w-full">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/send-otp" element={<SendOTP />}></Route>
          <Route path ="/confirm-otp" element={<Login/>}></Route>
          <Route
              path="/"
              element={<Dashboard/>}
            ></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/watch-later"
              element={<WatchLater/>}
            ></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
