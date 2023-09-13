import React from "react";

const Button = ({text, type, onClick}) => {
  return (
    <button
      className="bg-violet-800 w-full hover:bg-violet-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
