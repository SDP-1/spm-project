import React, { useState } from 'react';
import { FaClone } from 'react-icons/fa';

const CloneModal = ({ isOpen, onClose, onClone }) => {
  const [folderPath, setFolderPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClone = async () => {
    setLoading(true);
    setError('');

    try {
      await onClone(folderPath); // Call the cloning function with only folderPath
      setFolderPath(''); // Clear the folder path after action
      onClose(); // Close the modal after successful action
    } catch (err) {
      setError('Failed to add path. Please check the input and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Adjusted the background overlay for more transparency */}
      <div
        className="fixed inset-0 bg-black"
        style={{ opacity: 0.2 }} // Slightly transparent black background
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-md shadow-lg p-6 z-10" style={{ width: '30%', margin: '0 auto' }}>
        <h2 className="text-lg font-bold mb-4">Add Folder Path</h2>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter folder path"
            value={folderPath}
            onChange={(e) => setFolderPath(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-[#41889e] transition-colors duration-300"
          />
          <button
            onClick={handleClone}
            className="bg-[#41889e] text-white p-2 rounded hover:bg-[#357a8d] flex items-center justify-center"
            disabled={loading}
          >
            <FaClone className="mr-2" />
            {loading ? "Adding..." : "Add Path"}
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
