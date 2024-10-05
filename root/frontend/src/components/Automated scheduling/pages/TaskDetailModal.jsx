import React, { useRef } from "react";
import { FaPrint, FaTimes, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  const printRef = useRef(); // Reference to the printable area

  if (!isOpen || !task) return null;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set up the title and style
    doc.setFontSize(20);
    doc.text("Task Details", 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    // Add task information
    const info = [
      { label: "Name", value: task.taskName },
      { label: "Description", value: task.description },
      { label: "Project ID", value: task.projectId },
      { label: "Recurring", value: task.recurring ? "Yes" : "No" },
      ...(task.recurring
        ? [
            { label: "Frequency Type", value: task.frequencyType },
            { label: "Frequency Value", value: task.frequencyValue },
            ...(task.SpecificTime
              ? [
                  {
                    label: "Specific Time",
                    value: new Date(task.SpecificTime).toLocaleString(),
                  },
                ]
              : []),
          ]
        : []),
    ];

    // Add task information to the PDF
    let y = 30; // Start y position
    info.forEach((item) => {
      doc.text(`${item.label}: ${item.value}`, 14, y);
      y += 10; // Move down for the next item
    });

    // Tools and Metrics
    if (task.selectedTools.length > 0) {
      y += 10; // Space before tools section
      doc.text("Selected Tools & Metrics:", 14, y);
      y += 10; // Move down for the next section
      task.selectedTools.forEach((tool) => {
        doc.text(`- ${tool}:`, 14, y);
        y += 5;
        Object.entries(task.toolMetrics[tool]).forEach(
          ([metric, isSelected]) => {
            if (isSelected) {
              doc.text(`  • ${metric}`, 20, y);
              y += 5;
            }
          }
        );
        y += 5; // Space after each tool
      });
    }

    // Timestamps
    y += 10; // Space before timestamps
    doc.text(`Created at: ${new Date(task.createdAt).toLocaleString()}`, 14, y);
    y += 10;
    doc.text(`Updated at: ${new Date(task.updatedAt).toLocaleString()}`, 14, y);

    // Save the PDF
    doc.save("task-details.pdf");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur bg-opacity-10 bg-gray-800">
      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-lg p-8 w-full max-w-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
        >
          <FaTimes className="text-gray-500 h-5 w-5" />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Task Details
        </h2>

        {/* Task Information */}
        <div ref={printRef} className="space-y-4 text-gray-600">
          <div className="flex justify-between items-center">
            <span className="font-bold">Name:</span>
            <span>{task.taskName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Description:</span>
            <span>{task.description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Project ID:</span>
            <span>{task.projectId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Recurring:</span>
            <span>{task.recurring ? "Yes" : "No"}</span>
          </div>
          {task.recurring && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold">Frequency Type:</span>
                <span>{task.frequencyType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Frequency Value:</span>
                <span>{task.frequencyValue}</span>
              </div>
              {task.SpecificTime && (
                <div className="flex justify-between items-center">
                  <span className="font-bold">Specific Time:</span>
                  <span>{new Date(task.SpecificTime).toLocaleString()}</span>
                </div>
              )}
            </>
          )}

          {/* Tools and Metrics */}
          {task.selectedTools.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Selected Tools & Metrics
              </h3>
              {task.selectedTools.map((tool) => (
                <div key={tool} className="mb-2">
                  <strong className="block">{tool}:</strong>
                  <ul className="pl-4 list-disc text-sm text-gray-600">
                    {Object.entries(task.toolMetrics[tool]).map(
                      ([metric, isSelected]) =>
                        isSelected && <li key={metric}>{metric}</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Timestamps */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              Created at:{" "}
              <strong>{new Date(task.createdAt).toLocaleString()}</strong>
            </p>
            <p>
              Updated at:{" "}
              <strong>{new Date(task.updatedAt).toLocaleString()}</strong>
            </p>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
          >
            Close
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-300 flex items-center"
          >
            <FaDownload className="mr-2" /> Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
