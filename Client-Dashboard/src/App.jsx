import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddGenre from "./Pages/AddGenre";
import AddMovies from "./Pages/AddMovies";
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import { useState } from "react";

function App() {
  const [isWatchLater, setIsWatchLater] = useState(true);
  return (
    <>
      <Header />
      <div className="flex">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard setIsWatchLater={setIsWatchLater}/>}></Route>
            <Route path="/login" element={<Dashboard />}></Route>

            <Route path="/add-genre" element={<AddGenre />}></Route>
            <Route path="/add-movies/:id?" element={<AddMovies />}></Route>
            <Route
              path="/watch-later"
              element={<Dashboard isWatchLater={isWatchLater} setIsWatchLater={setIsWatchLater} />}
            ></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>

          <Route path="*" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
