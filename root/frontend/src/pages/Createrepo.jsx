import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa'; // Importing icons for public/private access

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

      const data = await response.json(); // Parse the JSON response
      alert('Project created successfully!');
      console.log(data); // This will log the response from the server

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
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="projectDetails">
            Project Description
          </label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Access</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="public"
                name="access"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className="mr-2"
              />
              <FaUnlock className="text-green-500" />
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
              <FaLock className="text-red-500" />
              <label htmlFor="private" className="ml-2">Private</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="authorName">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="authorEmail">
            Author Email
          </label>
          <input
            type="email"
            id="authorEmail"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default Createrepo;
