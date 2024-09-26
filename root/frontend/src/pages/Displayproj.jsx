import React, { useState, useEffect } from "react";
import {
  FaEllipsisV,
  FaArrowRight,
  FaFilter,
  FaHeart,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Displayproj = () => {
  const [projects, setProjects] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [files, setFiles] = useState([]);
  const [repoName, setRepoName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSaveToFirebase = async (projectId, files, repoName) => {
    try {
      const response = await fetch("http://localhost:5000/save-to-firebase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files, repoName, projectId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Files saved to Firebase:", data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex mb-4 space-x-4 items-center">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-1/4 px-4 py-2 border rounded-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="flex items-center px-4 py-2 border rounded-md bg-[#41889e] text-white hover:bg-[#357a8d] focus:outline-none">
          <FaFilter className="mr-2" />
          Filter
        </button>
        <span className="flex items-center text-[#41889e] font-semibold">
          {filteredProjects.length} Project
          {filteredProjects.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filteredProjects.map((project, index) => (
        <div
          key={project._id}
          className="mb-4 p-4 border rounded-md shadow-md space-y-2 bg-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{project.projectName}</h2>
              <p className="text-sm text-gray-600">{project.projectDetails}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Repository Name:</strong> {project.repositoryName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                onClick={() => navigate(`/newrepo/${project._id}`)} // Pass project ID
                className="flex items-center px-4 py-2 text-[#41889e] hover:shadow-md hover:shadow-gray-400 focus:outline-none transition-shadow duration-300 cursor-pointer"
              >
                <span className="mr-2">Add Repository</span>
                <FaArrowRight />
              </a>
              <a
                href="/editproject"
                className="flex items-center px-4 py-2 text-[#41889e] hover:shadow-md hover:shadow-gray-400 focus:outline-none transition-shadow duration-300"
              >
                <span className="mr-2">Edit</span>
                <FaEdit />
              </a>
              <FaHeart className="text-[#41889e] cursor-pointer" />
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="focus:outline-none"
                >
                  <FaEllipsisV className="text-[#41889e]" />
                </button>
                {dropdownVisible === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedProjectId(project._id);
                        setRepoName(project.repositoryName);
                        // Mock files array, replace with actual file fetching logic
                        const mockFiles = [
                          {
                            download_url: "https://example.com/file1",
                            path: "file1.txt",
                            type: "text/plain",
                          },
                          {
                            download_url: "https://example.com/file2",
                            path: "file2.txt",
                            type: "text/plain",
                          },
                        ];
                        setFiles(mockFiles);
                        handleSaveToFirebase(
                          project._id,
                          mockFiles,
                          project.repositoryName
                        );
                      }}
                      className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full text-left"
                    >
                      Save to Firebase
                    </button>
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

      <a
        href="/createrepo"
        className="fixed bottom-4 right-4 bg-[#41889e] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#357a8d] focus:outline-none flex items-center space-x-2"
      >
        <div className="text-white text-xl font-bold">+</div>
        <span>Add New Project</span>
      </a>
    </div>
  );
};

export default Displayproj;
