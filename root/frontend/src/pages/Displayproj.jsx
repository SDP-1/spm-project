import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaArrowRight, FaPlus } from 'react-icons/fa';

const Displayproj = () => {
  const [projects, setProjects] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
  
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 relative">
      {projects.map((project, index) => (
        <div key={project._id} className="mb-4 p-4 border rounded-md shadow-md space-y-2 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{project.projectName}</h2>
              <p className="text-sm text-gray-600">{project.projectDetails}</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaArrowRight className="text-blue-500 cursor-pointer" />

              <div className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="focus:outline-none"
                >
                  <FaEllipsisV className="text-gray-600" />
                </button>
                {dropdownVisible === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      Delete Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={() => alert('Add a new project')}
      >
        <FaPlus className="text-white" />
      </button>
    </div>
  );
};

export default Displayproj;
