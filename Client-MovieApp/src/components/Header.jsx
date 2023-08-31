import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { FiBell } from "react-icons/fi";
const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className="w-full h-16 bg-gray-950 text-white flex justify-between px-5 py-5">
        <Link to="/" className="flex gap-2 logo">
          <img className="w-9" src="/movie-recording.png" />
          <h5 className=" font-extrabold">TMDB - MOVIE APP</h5>
        </Link>
        <div className="notification flex gap-2">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center text-sm gap-3.5 font-medium p-3 rounded-md bg-violet-800 focus:ring-1 hover:bg-violet-950 focus:bg-violet-950"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/watch-later"
                className="flex items-center text-sm gap-3.5 font-medium p-3 rounded-md bg-violet-800 focus:ring-1 hover:bg-violet-950 focus:bg-violet-950"
              >
                Watch Later
              </Link>
              <Link
                to="/logout"
                className="flex items-center text-sm gap-3.5 font-medium p-3 rounded-md bg-violet-800 focus:ring-1 hover:bg-violet-950 focus:bg-violet-950"
              >
                Logout
              </Link>
            </>
          )}
        </div>
        {/* <div className="notification">
          <FiBell />
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full -top-6 left-3  w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 -top-6 left-3 bg-violet-800"></span>
          </span>
        </div> */}
      </div>
    </>
  );
};

export default Header;
