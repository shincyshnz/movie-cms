import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notification from "./Notification";
import { MdOutlineWatchLater, MdLogout } from "react-icons/md";

const Header = () => {
  const { isAuthenticated, userEmail } = useAuth();
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
            <h4 className="sm:text-sm md:text-md">{userEmail}</h4>
              <Link
                to="/watch-later"
                className="flex items-center text-xl gap-3.5 font-medium p-3 rounded-md focus:ring-1 hover:text-violet-800 focus:bg-violet-950"
                data-te-toggle="tooltip"
                title="Watch Later"
              >
                <MdOutlineWatchLater />
              </Link>
              <Notification />
              <Link
                to="/logout"
                className="flex items-center text-xl gap-3.5 font-medium p-3 rounded-mdfocus:ring-1 focus:bg-violet-950"
                data-te-toggle="tooltip"
                title="Logout"
              >
                <MdLogout />
              </Link>
            </>
          )}
        </div>
        {}
      </div>
    </>
  );
};

export default Header;
