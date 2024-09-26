import React, { useState, useEffect } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';

const EditProjectPopup = ({ project, onClose, onUpdate }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [isPublic, setIsPublic] = useState(true); // Default to Public
  const [repositoryName, setRepositoryName] = useState('');

  // Effect to set local state when project prop changes
  useEffect(() => {
    if (project) {
      setProjectName(project.projectName);
      setProjectDetails(project.projectDetails);
      setIsPublic(project.access === 'Public');
      setRepositoryName(project.repositoryName);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      _id: project._id,
      projectName,
      projectDetails,
      repositoryName,
      access: isPublic ? 'Public' : 'Private', // Only include if needed
    };
    onUpdate(updatedProject);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Project Details</label>
            <textarea
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              rows="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Access</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="mr-2"
                />
                <FaUnlock />
                <span className="ml-2">Public</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="mr-2"
                />
                <FaLock />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Repository Name</label>
            <input
              type="text"
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPopup;
