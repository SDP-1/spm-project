import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';

const Createrepo = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      projectName,
      projectDetails,
      access: isPublic ? 'Public' : 'Private',
      authorName,
      authorEmail,
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
      setAuthorEmail('');
    } catch (error) {
      alert('Failed to create the project.');
      console.error('There was an error creating the project!', error);
    }
  };

  return (
    <div 
      className="max-w-lg mx-auto p-6 bg-[#e6f3f8] shadow-md rounded-lg"
      style={{ fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace' }}
    >
      <h1 className="text-3xl font-bold mb-6">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="projectDetails">
            Project Description
          </label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            rows="6"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Access</label>
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
              <FaUnlock />
              <label htmlFor="public" className="ml-2">Public</label>
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
              <FaLock />
              <label htmlFor="private" className="ml-2">Private</label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="authorName">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="authorEmail">
            Author Email
          </label>
          <input
            type="email"
            id="authorEmail"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-[#41889e] text-white font-bold rounded-md hover:bg-[#357a8d]"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default Createrepo;
