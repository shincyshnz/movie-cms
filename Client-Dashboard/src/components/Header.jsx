import React from "react";
import { FiBell } from "react-icons/fi";
const Header = () => {
  return (
    <>
      <div className="w-full h-16 bg-gray-950 text-white flex justify-between px-5 py-5">
        <div className="flex gap-2 logo">
          <img className="w-9" src="/movie-recording.png" />
          <h5 className=" font-extrabold">TMDB</h5>
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
