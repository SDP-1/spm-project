import React from "react";

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
  >
    {children}
  </button>
);

export default Button;
