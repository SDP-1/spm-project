// FileList.jsx
import React from "react";

const FileList = ({ files, selectedFiles, onSelectFile }) => {
  if (Object.keys(files).length === 0) {
    return <p className="text-red-500">No files available</p>; // Show a message if no files are available
  }

  return (
    <div className="bg-white p-4 rounded shadow min-w-[250px] max-w-[300px]">
      {/* Set min and max width */}
      <label className="text-xl block mb-5 font-semibold">Select File</label> {/* Add label */}
      <ul>
        {Object.keys(files).map((file) => (
          <li
            key={file}
            onClick={() => onSelectFile(file)}
            className={`cursor-pointer p-2 m-1 transition-colors duration-300 rounded ${
              selectedFiles.includes(file) ? "bg-blue-200 font-semibold" : "hover:bg-blue-100"
            }`} // Added rounded class for rounded corners
          >
            {file.split("\\").pop()} {/* Display just the file name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
