// FilePreview.jsx
import React from "react";
import Stats from "./Status"; // Your existing Stats component

const FilePreview = ({ data, fileName }) => {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Metrics for {fileName}</h2>
      <Stats data={data} />
    </div>
  );
};

export default FilePreview;
