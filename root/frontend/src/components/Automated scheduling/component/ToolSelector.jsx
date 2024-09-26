import React from "react";
import Button from "./Button";

const ToolSelector = ({ tools, selectedTools, handleToolSelection, disable }) => (
  <div className="mb-4">
    <label className="block text-black text-sm font-bold mb-2">Select Tools</label>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <Button
          key={tool.name}
          className={`px-4 py-2 rounded-lg ${
            selectedTools.includes(tool.name)
              ? "bg-[#41889e] text-white"
              : "bg-[#91e5ff] text-[#41889e]"
          } hover:bg-[#6eceeb]`}
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
