import React from "react";
import { FiBell } from "react-icons/fi";
const Header = () => {
  return (
    <>
      <div className="w-100 h-16 bg-gray-950 text-white flex justify-end px-5 py-5">
        <FiBell />
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full -top-2 w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 -top-2 bg-violet-800"></span>
        </span>
      </div>
    </>
  );
};

export default Header;
