import React, { useState } from 'react';
import { FaClone } from 'react-icons/fa'; // Importing clone icon

const Newrepo = () => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleClone = () => {
    // Handle cloning logic here
    alert(`Cloning repository: ${repoUrl}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-4">
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
    </div>
  );
};

export default Newrepo;
