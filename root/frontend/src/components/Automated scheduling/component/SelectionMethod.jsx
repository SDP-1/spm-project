import React from "react";
import Button from "./Button";

const SelectionMethod = ({ selectionMethod, handleSelectionMethodChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      For Now or Recurring
    </label>
    <div className="flex gap-4">
      <Button
        onClick={() => handleSelectionMethodChange("For Now")}
        className={`px-4 py-2 rounded-lg ${
          selectionMethod === "For Now"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        } hover:bg-blue-400`}
      >
        For Now
      </Button>
      <Button
        onClick={() => handleSelectionMethodChange("Recurring")}
        className={`px-4 py-2 rounded-lg ${
          selectionMethod === "Recurring"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        } hover:bg-blue-400`}
      >
        Recurring
      </Button>
    </div>
  </div>
);

export default SelectionMethod;
