import React from "react";
import Button from "./Button";

const SelectionMethod = ({ selectionMethod, handleSelectionMethodChange, disable }) => (
  <div className="mb-4">
    <label className="block text-black text-sm font-bold mb-2">
      For Now or Recurring
    </label>
    <div className="flex gap-4">
      <Button
        onClick={() => !disable && handleSelectionMethodChange("For Now")}
        className={`px-4 py-2 rounded-lg ${
          selectionMethod === "For Now"
            ? "bg-[#41889e] text-white"
            : "bg-[#91e5ff] text-[#41889e]"
        } hover:bg-[#6eceeb]`}
        disable={disable}
      >
        For Now
      </Button>
      <Button
        onClick={() => !disable && handleSelectionMethodChange("Recurring")}
        className={`px-4 py-2 rounded-lg ${
          selectionMethod === "Recurring"
            ? "bg-[#41889e] text-white"
            : "bg-[#91e5ff] text-[#41889e]"
        } hover:bg-[#6eceeb]`}
        disable={disable}
      >
        Recurring
      </Button>
    </div>
  </div>
);

export default SelectionMethod;
