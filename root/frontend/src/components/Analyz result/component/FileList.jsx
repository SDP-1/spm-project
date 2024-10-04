import React from "react";

const FileList = ({ files, selectedFiles, onSelectFile }) => {
  // Render message if no files are available
  if (Object.keys(files).length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-red-500 text-center">No files available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-w-[250px] max-w-[300px]">
      {/* Set min and max width */}
      <label className="text-xl block mb-4 font-semibold text-neutral-700">Select File</label> {/* Add label */}
      <ul>
        {Object.keys(files).map((file) => (
          <li
            key={file}
            onClick={() => onSelectFile(file)}
            className={`cursor-pointer p-3 m-1 transition-colors duration-300 rounded-md ${
              selectedFiles.includes(file)
                ? "bg-blue-200 text-blue-900 font-semibold" // Highlight selected file
                : "hover:bg-blue-100 text-neutral-700" // Hover effect
            }`}
          >
            {file.split("\\").pop()} {/* Display just the file name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
