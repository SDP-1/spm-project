import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ProjectDetailsPrint = ({ onClose }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState({});
  const [columnSelections, setColumnSelections] = useState({
    projectName: true,
    projectDetails: true,
    repositoryName: true,
    access: true,
    authorName: true,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch project data');
        const data = await response.json();
        setProjects(data);
        
        // Initialize selectedProjects with all projects selected
        const initialSelection = {};
        data.forEach((project) => {
          initialSelection[project._id] = true; // Default checked
        });
        setSelectedProjects(initialSelection);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Project Details', 14, 22);

    const tableColumn = [];
    const tableRows = [];

    // Select columns based on user choice
    if (columnSelections.projectName) tableColumn.push('Project Name');
    if (columnSelections.projectDetails) tableColumn.push('Project Details');
    if (columnSelections.repositoryName) tableColumn.push('Repository Name');
    if (columnSelections.access) tableColumn.push('Access');
    if (columnSelections.authorName) tableColumn.push('Author Name');

    projects.forEach((project) => {
      if (selectedProjects[project._id]) {
        const projectData = [];
        if (columnSelections.projectName) projectData.push(project.projectName);
        if (columnSelections.projectDetails) projectData.push(project.projectDetails);
        if (columnSelections.repositoryName) projectData.push(project.repositoryName);
        if (columnSelections.access) projectData.push(project.access);
        if (columnSelections.authorName) projectData.push(project.authorName);
        tableRows.push(projectData);
      }
    });

    // Generate PDF table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { cellPadding: 3, fontSize: 10 },
      headStyles: { fillColor: '#4CAF50', textColor: 'white' },
    });

    doc.save('ProjectDetails.pdf');
  };

  const handleProjectSelection = (projectId) => {
    setSelectedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleColumnSelection = (columnName) => {
    setColumnSelections((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
        <h2 className="text-lg font-bold mb-4 text-center">Download Project Details</h2>

        <h3 className="font-semibold mb-2">Select Columns:</h3>
        <div className="flex mb-4 flex-wrap justify-center">
          {Object.keys(columnSelections).map((key) => (
            <div key={key} className="mr-4">
              <input
                type="checkbox"
                id={key}
                checked={columnSelections[key]}
                onChange={() => handleColumnSelection(key)}
              />
              <label htmlFor={key} className="ml-2">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
            </div>
          ))}
        </div>

        <h3 className="font-semibold mb-2">Select Projects:</h3>
        <div className="overflow-auto max-h-60 border border-gray-300 rounded">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 p-2">Select</th>
                {columnSelections.projectName && (
                  <th className="border border-gray-300 p-2">Project Name</th>
                )}
                {columnSelections.projectDetails && (
                  <th className="border border-gray-300 p-2">Project Details</th>
                )}
                {columnSelections.repositoryName && (
                  <th className="border border-gray-300 p-2">Repository Name</th>
                )}
                {columnSelections.access && (
                  <th className="border border-gray-300 p-2">Access</th>
                )}
                {columnSelections.authorName && (
                  <th className="border border-gray-300 p-2">Author Name</th>
                )}
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center border border-gray-300 p-2">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={selectedProjects[project._id] || false}
                        onChange={() => handleProjectSelection(project._id)}
                      />
                    </td>
                    {columnSelections.projectName && (
                      <td className="border border-gray-300 p-2">{project.projectName}</td>
                    )}
                    {columnSelections.projectDetails && (
                      <td className="border border-gray-300 p-2">{project.projectDetails}</td>
                    )}
                    {columnSelections.repositoryName && (
                      <td className="border border-gray-300 p-2">{project.repositoryName}</td>
                    )}
                    {columnSelections.access && (
                      <td className="border border-gray-300 p-2">{project.access}</td>
                    )}
                    {columnSelections.authorName && (
                      <td className="border border-gray-300 p-2">{project.authorName}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-[#41889e] text-white rounded-md hover:bg-[#357a8d] mr-2"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button className="px-4 py-2 border rounded-md" onClick={onClose}>
            Close
          </button>
        </div>

        <div id="print-content" className="hidden">
          <h2 className="text-lg font-bold">Project Details</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-200">
                {columnSelections.projectName && (
                  <th className="border border-gray-300 p-2">Project Name</th>
                )}
                {columnSelections.projectDetails && (
                  <th className="border border-gray-300 p-2">Project Details</th>
                )}
                {columnSelections.repositoryName && (
                  <th className="border border-gray-300 p-2">Repository Name</th>
                )}
                {columnSelections.access && (
                  <th className="border border-gray-300 p-2">Access</th>
                )}
                {columnSelections.authorName && (
                  <th className="border border-gray-300 p-2">Author Name</th>
                )}
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center border border-gray-300 p-2">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-100">
                    {columnSelections.projectName && (
                      <td className="border border-gray-300 p-2">{project.projectName}</td>
                    )}
                    {columnSelections.projectDetails && (
                      <td className="border border-gray-300 p-2">{project.projectDetails}</td>
                    )}
                    {columnSelections.repositoryName && (
                      <td className="border border-gray-300 p-2">{project.repositoryName}</td>
                    )}
                    {columnSelections.access && (
                      <td className="border border-gray-300 p-2">{project.access}</td>
                    )}
                    {columnSelections.authorName && (
                      <td className="border border-gray-300 p-2">{project.authorName}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPrint;
