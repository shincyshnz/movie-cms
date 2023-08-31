import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddGenre from "./Pages/AddGenre";
import AddMovies from "./Pages/AddMovies";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./Pages/Logout";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Header />
      <div className="flex">
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
          <Route path="/" element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            ></Route>
            <Route path="/add-genre" element={<AddGenre />}></Route>
            <Route path="/add-movies/:id?" element={<AddMovies />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
