import React from "react";
import Stats from "./Status"; // Import your Stats component
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the jsPDF autoTable plugin for table rendering

const FileSelectModal = ({
  isOpen,
  onClose,
  files,
  onSelectFile,
  selectedFiles,
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleFileSelect = (file) => {
    onSelectFile(file); // Call the function passed from StatusPage
  };

  const handlePrint = () => {
    const pdf = new jsPDF();
    let currentY = 10; // Starting Y position for the first table

    // Loop through selected files and generate tables
    selectedFiles.forEach((file, fileIndex) => {
      // Define columns for the table
      const columns = ["Metric", "Value", "Status"];
      const rows = [];

      const metrics = files[file];
      Object.entries(metrics).forEach(([metric, value]) => {
        let status;

        if (value >= 75) {
          status = "Good";
        } else if (value >= 50) {
          status = "Average";
        } else {
          status = "Bad";
        }

        // Push each metric as a row
        rows.push([metric, value, status]);
      });

      // Add file name as a title above the table
      pdf.text(`File: ${file.split("\\").pop()}`, 10, currentY);

      // Add the table for the current file
      pdf.autoTable({
        head: [columns], // Column headers
        body: rows, // Data for the rows
        startY: currentY + 10, // Position the table below the file name
        margin: { top: 10 }, // Ensure there's some space above the tables
      });

      // Update the Y position for the next table
      currentY = pdf.previousAutoTable.finalY + 10; // Get Y position after the last table
    });

    // Get the current date and time
    const currentDate = new Date().toLocaleString();

    // Set a small font size for the date and time
    pdf.setFontSize(8); // Very small font size

    // Add the date and time to the bottom-left corner of the PDF
    pdf.text(`Printed on: ${currentDate}`, 10, pdf.internal.pageSize.height - 10);

    // Save the PDF
    pdf.save("document.pdf");

    onClose(); // Close the modal after printing
  };

  const renderMetrics = (metrics) => {
    return Object.entries(metrics).map(([metric, value]) => {
      let status;

      if (value >= 75) {
        status = "Good";
      } else if (value >= 50) {
        status = "Average";
      } else {
        status = "Bad";
      }

      return (
        <div key={metric} className="flex justify-between mb-2">
          <span>{metric}:</span>
          <span>{value}</span>
          <span
            className={`font-bold ${
              status === "Good"
                ? "text-green-500"
                : status === "Average"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {status}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg p-6 w-3/4 max-w-4xl flex flex-col relative"
        style={{ height: "600px" }} // Fixed height for the modal
      >
        <div className="flex flex-grow">
          <div className="w-1/3 pr-4">
            <h2 className="text-xl font-semibold mb-4">Select Files to Print</h2>
            <ul className="max-h-52 overflow-y-auto mb-4 border border-gray-300 rounded-lg">
              {Object.keys(files).map((file) => (
                <li
                  key={file}
                  className={`cursor-pointer p-2 hover:bg-gray-200 ${
                    selectedFiles.includes(file) ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  {file.split("\\").pop()}
                </li>
              ))}
            </ul>
          </div>

          {/* Preview Area with fixed size */}
          <div className="flex flex-col w-3/4" style={{ height: "500px" }}>
            <h3 className="text-lg font-semibold">Preview:</h3>
            <div
              id="preview-area" // Added an ID for the print preview area
              className="border border-gray-300 rounded-lg p-2"
              style={{ height: "100%", overflowY: "auto" }} // Use full height
            >
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file) => (
                  <div key={file} className="mb-4">
                    <h4 className="font-bold">{file.split("\\").pop()}:</h4>
                    {/* Render metrics for each file */}
                    {renderMetrics(files[file])}
                  </div>
                ))
              ) : (
                <p>No files selected for preview.</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons at the bottom */}
        <div className="absolute bottom-4 left-6 right-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handlePrint} // Changed to handlePrint
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileSelectModal;
