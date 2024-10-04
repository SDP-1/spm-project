import React from "react";
import Button from "./Button";

const SelectionMethod = ({
  selectionMethod,
  handleSelectionMethodChange,
  disable,
}) => (
  <div className="mb-4">
    <label className="block text-gray-800 text-sm font-semibold mb-2">
      For Now or Recurring
    </label>
    <div className="flex gap-4">
      <Button
        onClick={() => !disable && handleSelectionMethodChange("For Now")}
        className={`${
          selectionMethod === "For Now"
            ? "bg-blue-600 text-white border-2 border-blue-800 shadow-md" // Selected state with border
            : "bg-gray-300 text-black opacity-75" // Unselected state with reduced opacity
        } transition-colors`}
        disable={disable}
      >
        For Now
      </Button>
      <Button
        onClick={() => !disable && handleSelectionMethodChange("Recurring")}
        className={`${
          selectionMethod === "Recurring"
            ? "bg-blue-600 text-white border-2 border-blue-800 shadow-md" // Selected state with border
            : "bg-gray-300 text-black opacity-75" // Unselected state with reduced opacity
        } transition-colors`}
        disable={disable}
      >
        Recurring
      </Button>
    </div>
  </div>
);

export default SelectionMethod;
