import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="w-full min-h-screen max-w-xs m-auto pt-16">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {children}
      </form>
    </div>
  );
};

export default FormContainer;
