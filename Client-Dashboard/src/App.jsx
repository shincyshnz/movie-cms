import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddGenre from "./Pages/AddGenre";
import AddMovies from "./Pages/AddMovies";
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Pages/Login";

function App() {
  const pathName = window.location.pathname.slice(1);
  return (
    <>
      <Header />
      <div className="flex">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/add-genre" element={<AddGenre />}></Route>
            <Route path="/add-movies/:id?" element={<AddMovies />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
