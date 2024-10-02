import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Createrepo = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      projectName,
      projectDetails,
      access: isPublic ? 'Public' : 'Private',
      authorName,
      repositoryName,
    };

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      alert('Project created successfully!');
      console.log(data);

      // Optionally clear the form
      setProjectName('');
      setProjectDetails('');
      setIsPublic(true);
      setAuthorName('');
      setRepositoryName('');

      // Navigate to /displayproj after successfully creating the project
      navigate('/displayproj');
    } catch (error) {
      alert('Failed to create the project.');
      console.error('There was an error creating the project!', error);
    }
  };

  return (
    <div 
      className="max-w-lg mx-auto p-8 bg-[#f0f4f8] shadow-lg rounded-lg border border-gray-300"
      style={{ fontFamily: 'Inter, sans-serif' }} // Using a modern sans-serif font
    >
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41889e]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="projectDetails">
            Project Description
          </label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41889e]"
            rows="6"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Access</label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="public"
                name="access"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className="mr-2"
              />
              <FaUnlock className="text-[#41889e]" />
              <label htmlFor="public" className="ml-2 text-gray-700">Public</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="private"
                name="access"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
                className="mr-2"
              />
              <FaLock className="text-[#41889e]" />
              <label htmlFor="private" className="ml-2 text-gray-700">Private</label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="authorName">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41889e]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="repositoryName">
            Repository Name
          </label>
          <input
            type="text"
            id="repositoryName"
            value={repositoryName}
            onChange={(e) => setRepositoryName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#41889e]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-[#41889e] text-white font-bold rounded-md hover:bg-[#357a8d] transition duration-200"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default Createrepo;
