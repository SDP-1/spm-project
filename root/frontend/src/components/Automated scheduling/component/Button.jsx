import React from "react";

const Button = ({ onClick, children, className, disable }) => (
  <button
    onClick={disable ? undefined : onClick}
    className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className} ${disable ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={disable}
  >
    {children}
  </button>
);

export default Button;
