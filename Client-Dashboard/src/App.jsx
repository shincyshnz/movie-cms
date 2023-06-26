import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="px-10 py-5 md:py-20 md:px-48 bg-slate-700 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>

      {/* <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes> */}
    </>
  );
}

export default App;
