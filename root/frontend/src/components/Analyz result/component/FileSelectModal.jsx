import React, { useState } from "react";
import { FaTimes, FaPrint, FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FileSelectModal = ({
  isOpen,
  onClose,
  files,
  onSelectFile,
  selectedFiles,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleFileSelect = (file) => {
    onSelectFile(file);
  };

  const handlePrint = () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to print.");
      return;
    }

    const pdf = new jsPDF();
    let currentY = 20;

    // PDF Title
    pdf.setFontSize(20);
    pdf.text("Code Quality Report", 14, currentY);
    currentY += 10;

    selectedFiles.forEach((file, fileIndex) => {
      const metrics = files[file];
      const columns = ["Metric", "Value", "Status"];
      const rows = Object.entries(metrics).map(([metric, value]) => {
        let status = "Average";
        if (value >= 75) status = "Good";
        else if (value < 50) status = "Bad";

        return [metric, value, status];
      });

      pdf.setFontSize(14);
      pdf.text(`File: ${file.split("\\").pop()}`, 14, currentY);
      currentY += 10;

      // Add the table with improved styles
      pdf.autoTable({
        head: [columns],
        body: rows,
        startY: currentY,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [63, 81, 181], textColor: [255, 255, 255] },
        theme: "striped",
      });

      currentY = pdf.previousAutoTable.finalY + 10;

      // Add new page if necessary
      if (
        currentY > pdf.internal.pageSize.height - 30 &&
        fileIndex !== selectedFiles.length - 1
      ) {
        pdf.addPage();
        currentY = 20;
      }
    });

    const currentDate = new Date().toLocaleString();
    pdf.setFontSize(10);
    pdf.text(
      `Printed on: ${currentDate}`,
      14,
      pdf.internal.pageSize.height - 10
    );

    // Footer
    pdf.setFontSize(8);
    pdf.text(
      "Confidential - Do Not Distribute",
      14,
      pdf.internal.pageSize.height - 20
    );

    pdf.save("code_quality_report.pdf");
    onClose();
  };

  const renderMetrics = (metrics) => {
    return Object.entries(metrics).map(([metric, value]) => {
      let status = "Average";
      let statusColor = "text-yellow-500";

      if (value >= 75) {
        status = "Good";
        statusColor = "text-green-500";
      } else if (value < 50) {
        status = "Bad";
        statusColor = "text-red-500";
      }

      return (
        <div key={metric} className="flex justify-between mb-2">
          <span className="text-gray-700">{metric}:</span>
          <span className="font-medium text-gray-800">{value}</span>
          <span className={`font-bold ${statusColor}`}>{status}</span>
        </div>
      );
    });
  };

  const filteredFiles = Object.keys(files).filter((file) =>
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-6 w-11/12 max-w-5xl shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close Modal"
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col lg:flex-row h-full">
          {/* File Selection Panel */}
          <div className="w-full lg:w-1/3 pr-4 mb-6 lg:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              Select Files to Print
              <FaSearch className="ml-2 text-gray-500" />
            </h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search files..."
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <ul className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-2">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <li
                    key={file}
                    className={`cursor-pointer p-3 rounded-lg mb-2 flex items-center justify-between transition-colors duration-200 ${
                      selectedFiles.includes(file)
                        ? "bg-blue-100 border border-blue-300"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <span className="text-gray-700">
                      {file.split("\\").pop()}
                    </span>
                    {selectedFiles.includes(file) && (
                      <span className="text-blue-500 font-semibold">
                        Selected
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center">No files found.</li>
              )}
            </ul>
          </div>

          {/* Preview Panel */}
          <div className="w-full lg:w-2/3 pl-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Preview:
            </h3>
            <div className="border border-gray-300 rounded-lg p-4 h-80 overflow-y-auto bg-gray-50">
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file) => (
                  <div key={file} className="mb-6">
                    <h4 className="text-xl font-bold text-gray-700 mb-2">
                      {file.split("\\").pop()}:
                    </h4>
                    {renderMetrics(files[file])}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-20">
                  No files selected for preview.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg mr-4 hover:bg-gray-400 transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <FaPrint className="mr-2" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileSelectModal;
