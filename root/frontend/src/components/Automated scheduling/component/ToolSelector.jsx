import React from "react";
import Button from "./Button";

const ToolSelector = ({
  tools,
  selectedTools,
  handleToolSelection,
  disable,
}) => (
  <div className="mb-4">
    <label className="block text-neutral-700 text-sm font-bold mb-2">
      Select Tools
    </label>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <Button
          key={tool.name}
          className={`${
            selectedTools.includes(tool.name)
              ? "bg-[#4F46E5] text-white"
              : "bg-neutral-100 text-neutral-700"
          } hover:bg-[#8f89ee] hover:text-white`}
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
