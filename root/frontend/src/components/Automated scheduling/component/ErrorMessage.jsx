import React from "react";

const ErrorMessage = ({ error }) => (
  error ? <p className="text-red-600 text-sm mt-2 font-semibold">{error}</p> : null
);

export default ErrorMessage;
