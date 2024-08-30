import React, { useState } from 'react';
import { FaClone } from 'react-icons/fa';

const Newrepo = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [files, setFiles] = useState([]);

  const handleClone = async () => {
    try {
      const encodedUrl = encodeURIComponent(repoUrl);
      const response = await fetch(`http://localhost:5000/api/github/repo-files?repoUrl=${encodedUrl}`);
      const data = await response.json();
      setFiles(data); // Set the files in the state
    } catch (error) {
      console.error('Error fetching repository files:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-4 space-y-4">
      {/* Cloning Box */}
      <div className="w-1/2 bg-[#e0e0e0] p-4 border border-[#c0c0c0] rounded-md shadow-md flex items-center">
        <input
          type="text"
          placeholder="Paste repository URL here"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="flex-grow p-2 bg-[#f0f9f9] border border-gray-300 rounded-l-md focus:outline-none focus:border-[#41889e] transition-colors duration-300"
        />
        <button
          onClick={handleClone}
          className="bg-[#41889e] text-white p-2 rounded-r-md hover:bg-[#357a8d] flex items-center"
        >
          <FaClone className="mr-2" />
          Clone Repository
        </button>
      </div>
      <div className="w-1/2 mt-4 p-4 bg-gray-100  rounded-md">
  <p>Select files to add to the SaaS tool</p>
</div>
      {/* File Display Section */}
      <div className="w-1/2 mt-4">
        {files.length > 0 ? (
          files.map(file => (
            <div key={file.sha} className="flex items-center p-2 bg-white border border-gray-300 rounded-md mb-2">
              <input
                type="checkbox"
                className="mr-2"
                // Add logic to handle checkbox state here if needed
              />
              <a href={file.html_url} target="_blank" rel="noopener noreferrer" className="flex-grow">
                {file.name}
              </a>
            </div>
          ))
        ) : (
          <p>No files to display</p>
        )}
      </div>
    </div>
  );
};

export default Newrepo;
