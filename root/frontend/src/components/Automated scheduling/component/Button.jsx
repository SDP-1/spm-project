import React from "react";

const Button = ({ onClick, children, className, disable }) => (
  <button
    onClick={disable ? undefined : onClick}
    className={`py-2 px-4 rounded-lg shadow-lg transition-colors duration-300 ease-in-out ${className} ${disable ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'}`}
    disabled={disable}
  >
    {children}
  </button>
);

export default Button;
