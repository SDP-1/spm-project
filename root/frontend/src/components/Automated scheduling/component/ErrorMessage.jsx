import React from "react";

const ErrorMessage = ({ error }) => (
  error ? <p className="text-red-500 text-sm mt-2">{error}</p> : null
);

export default ErrorMessage;
