import React, { useState, useRef } from 'react';
import { FaClone, FaFolderOpen } from 'react-icons/fa';

const CloneModal = ({ isOpen, onClose, onClone }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [folderPath, setFolderPath] = useState('');
  const folderInputRef = useRef(null); // Ref for the folder input

  const handleClone = async () => {
    setLoading(true);
    setError('');

    try {
      await onClone(repoUrl, folderPath); // Call the cloning function passed as a prop
      setRepoUrl('');
      setFolderPath(''); // Clear the folder path after cloning
      onClose(); // Close the modal after successful cloning
    } catch (err) {
      setError('Failed to clone repository. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle folder selection
  const handleFolderSelect = (e) => {
    const selectedFolder = e.target.files[0]; // Get the first selected folder
    if (selectedFolder) {
      // Update folderPath with the name of the selected folder
      setFolderPath(selectedFolder.webkitRelativePath.split('/')[0]); 
    }
  };

  // Function to trigger the folder input
  const handleSelectFolder = () => {
    folderInputRef.current.click(); // Trigger click on the hidden input
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-md shadow-lg p-6 z-10" style={{ width: '30%', margin: '0 auto' }}>
        <h2 className="text-lg font-bold mb-4">Clone Repository</h2>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Paste repository URL here"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-[#41889e] transition-colors duration-300"
          />
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Selected folder path"
              value={folderPath}
              readOnly
              className="p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-[#41889e] transition-colors duration-300"
            />
            <button
              type="button"
              onClick={handleSelectFolder}
              className="bg-[#41889e] text-white p-2 rounded hover:bg-[#357a8d] flex items-center"
            >
              <FaFolderOpen className="mr-2" />
              Select Folder
            </button>
            <input
              type="file"
              webkitdirectory=""
              directory=""
              ref={folderInputRef} // Attach the ref to the hidden input
              onChange={handleFolderSelect} // Handle folder selection
              style={{ display: 'none' }} // Hide the input
            />
          </div>
          <button
            onClick={handleClone}
            className="bg-[#41889e] text-white p-2 rounded hover:bg-[#357a8d] flex items-center"
            disabled={loading}
          >
            <FaClone className="mr-2" />
            {loading ? "Cloning..." : "Clone Repository"}
          </button>
          {error && (
            <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-800 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CloneModal;
