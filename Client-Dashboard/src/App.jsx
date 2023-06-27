import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddGenre from "./Pages/AddGenre";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <Routes>
          {/* <Route path="/" element={<Login />}></Route> */}
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/add-genre" element={<AddGenre />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
