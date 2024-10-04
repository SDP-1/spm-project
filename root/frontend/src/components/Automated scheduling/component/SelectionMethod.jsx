import React from "react";
import Button from "./Button";

const SelectionMethod = ({
  selectionMethod,
  handleSelectionMethodChange,
  disable,
}) => (
  <div className="mb-4">
    <label className="block text-neutral-700 text-sm font-bold mb-2">
      For Now or Recurring
    </label>
    <div className="flex gap-4">
      <Button
        onClick={() => !disable && handleSelectionMethodChange("For Now")}
        className={`${
          selectionMethod === "For Now"
            ? "bg-[#4F46E5] text-white"
            : "bg-neutral-100 text-neutral-700"
        } hover:bg-[#8f89ee] hover:text-white`}
        disable={disable}
      >
        For Now
      </Button>
      <Button
        onClick={() => !disable && handleSelectionMethodChange("Recurring")}
        className={`${
          selectionMethod === "Recurring"
            ? "bg-[#4F46E5] text-white"
            : "bg-neutral-100 text-neutral-700"
        } hover:bg-[#8f89ee] hover:text-white`}
        disable={disable}
      >
        Recurring
      </Button>
    </div>
  </div>
);

export default SelectionMethod;
