import React from "react";

const Button = ({ onClick, children, className, disable }) => (
  <button
    onClick={disable ? undefined : onClick}
    className={`py-2 px-4 rounded-full transition-colors duration-300 ${className} ${disable ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
    disabled={disable}
  >
    {children}
  </button>
);

export default Button;
