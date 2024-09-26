import React, { useState } from 'react';
//adding a new npm i
const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...e.dataTransfer.files]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles([...e.target.files]);
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center w-100 h-96 border-2 border-dashed ${
          dragActive ? 'border-blue-500' : 'border-gray-300'
        } rounded-lg p-6 cursor-pointer`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="text-gray-500 font-medium text-center"
        >
          Drag & Drop your files here or{' '}
          <span className="text-blue-500 underline">Browse</span>
        </label>
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Selected Files:</h4>
            <ul className="mt-2">
              {files.map((file, idx) => (
                <li key={idx} className="text-sm text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
