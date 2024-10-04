import React from "react";
import Button from "./Button";

const ToolSelector = ({
  tools,
  selectedTools,
  handleToolSelection,
  disable,
}) => (
  <div className="mb-4">
    <label className="block text-gray-800 text-sm font-semibold mb-2">
      Select Tools
    </label>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <Button
          key={tool.name}
          className={`${
            selectedTools.includes(tool.name)
              ? "bg-blue-600 text-white border-2 border-blue-800 shadow-md" // Selected state with border
              : "bg-gray-300 text-black opacity-75" // Unselected state with reduced opacity
          } transition-colors`}
          onClick={() => !disable && handleToolSelection(tool.name)}
          disable={disable}
        >
          {tool.name}
        </Button>
      ))}
    </div>
  </div>
);

export default ToolSelector;
