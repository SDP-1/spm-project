import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Createrepo = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const navigate = useNavigate();

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

      // Clear the form
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
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-4">
    <div
      className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-300 "
      style={{ fontFamily: 'Inter, sans-serif' }} // Using a modern sans-serif font
    >
      <h1 className="text-2xl font-title mb-6">Create Project</h1>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-black mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Project Description */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-black mb-2">Project Description</label>
          <textarea
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-4 py-2 h-[100px] border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />
        </div>

        {/* Access */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">Access</label>
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
              <label htmlFor="public" className="ml-2 text-black font-medium">Public</label>
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
              <label htmlFor="private" className="ml-2 text-black font-medium">Private</label>
            </div>
          </div>
        </div>

        {/* Author Name */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">Author Name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Repository Name */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">Repository Name</label>
          <input
            type="text"
            value={repositoryName}
            onChange={(e) => setRepositoryName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#4F46E5] text-white font-semibold rounded-2xl hover:bg-[#357a8d]"
        >
          Create Project
        </button>
      </form>
    </div>
    </div>
  );
};

export default Createrepo;
