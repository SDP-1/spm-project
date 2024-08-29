import React from "react";
import Button from "./Button";

const ToolSelector = ({ tools, selectedTools, handleToolSelection, disable }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Select Tools</label>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <Button
          key={tool.name}
          className={`px-4 py-2 rounded-lg ${
            selectedTools.includes(tool.name)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-400`}
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
