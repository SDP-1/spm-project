import React, { useState, useEffect } from "react";
import OverallCodeAnalysis from "../component/OverallCodeAnalysis";
import FileList from "../component/FileList";
import FilePreview from "../component/FilePreview";
import FileSelectModal from "../component/FileSelectModal"; // Import the modal component

const StatusPage = () => {
  const metricsData = {
    _id: {
      $oid: "66d197d8d0477a8bdb0ae167",
    },
    hash: "4d6c8d0f312876782cf135ce31acb71be57d344ef7183549401451375c72178f",
    directory_path:
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api",
    analysis_start_time: 1725011920.121682,
    results: {
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\Application.java":
        {
          cyclomatic_complexity: 2,
          loc: 20,
          comment_ratio: 0,
          halstead_bugprop: 0.072,
          halstead_difficulty: 8.45,
          halstead_effort: 1834.757,
          halstead_timerequired: 101.931,
          halstead_volume: 217.131,
        },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\JdbcRunRepository.java":
        {
          cyclomatic_complexity: 0,
          loc: 54,
          comment_ratio: 0,
          halstead_bugprop: 0.829,
          halstead_difficulty: 39.111,
          halstead_effort: 97273.11,
          halstead_timerequired: 5404.062,
          halstead_volume: 2487.097,
        },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\Location.java":
        {
          cyclomatic_complexity: 2,
          loc: 4,
          comment_ratio: 0,
          halstead_bugprop: 0.007,
          halstead_difficulty: 2,
          halstead_effort: 39.303,
          halstead_timerequired: 2.183,
          halstead_volume: 19.651,
        },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\Run.java":
        {
          cyclomatic_complexity: 1,
          loc: 28,
          comment_ratio: 0,
          halstead_bugprop: 0.149,
          halstead_difficulty: 10.333,
          halstead_effort: 4611.225,
          halstead_timerequired: 256.179,
          halstead_volume: 446.248,
        },
      "D:\\Projects\\Tutorials\\spring-boot-3-api\\src\\main\\java\\com\\dasunwickr\\spring_boot_3_api\\run\\RunController.java":
        {
          cyclomatic_complexity: 0,
          loc: 45,
          comment_ratio: 0,
          halstead_bugprop: 0.397,
          halstead_difficulty: 36.5,
          halstead_effort: 43453.533,
          halstead_timerequired: 2414.085,
          halstead_volume: 1190.508,
        },
      // Add more files as necessary
    },
  };

  const [selectedFiles, setSelectedFiles] = useState([]); // Changed to handle multiple files
  const [activeTab, setActiveTab] = useState("fileByFile");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  useEffect(() => {
    if (metricsData && metricsData.results) {
      const files = Object.keys(metricsData.results);
      if (files.length > 0 && selectedFiles.length === 0) {
        setSelectedFiles([files[0]]); // Set to the first file if no file is selected
      }
    }
  }, [metricsData.results]);

  const handleSelectFile = (file) => {
    setSelectedFiles(
      (prevSelectedFiles) =>
        prevSelectedFiles.includes(file)
          ? prevSelectedFiles.filter((f) => f !== file) // Deselect if already selected
          : [...prevSelectedFiles, file] // Add to selected
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Header Section */}
      <div className="fixed top-0 w-full bg-gradient-to-r from-blue-50 to-blue-100  z-50 p-4 rounded-b-lg">
        <h1 className="text-2xl font-bold text-gray-800">File Analysis</h1>
        {/* Tab Navigation */}
        <nav className="flex space-x-4 text-blue-600 mb-2">
          <a
            href="#"
            onClick={() => setActiveTab("fileByFile")}
            className={`hover:underline ${
              activeTab === "fileByFile" ? "font-semibold underline" : ""
            }`}
          >
            File By File
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("overallCode")}
            className={`hover:underline ${
              activeTab === "overallCode" ? "font-semibold underline" : ""
            }`}
          >
            Overall Code
          </a>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === "fileByFile" ? (
        <div className="flex mt-20">
          <div className="fixed w-1/4 bg-transparent rounded-lg  overflow-y-auto h-[calc(100vh-100px)]">
            <FileList
              files={metricsData.results}
              selectedFiles={selectedFiles}
              onSelectFile={handleSelectFile}
            />
          </div>
          <div className="w-3/4 ml-80 mt-4 flex flex-col">
            {selectedFiles.length > 0 &&
              selectedFiles.map((file) => (
                <FilePreview
                  key={file}
                  data={metricsData.results[file]}
                  fileName={file.split("\\").pop()}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="mt-20">
          <OverallCodeAnalysis data={metricsData.results} />
        </div>
      )}
      
      {/* Fixed Button to Print Document */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none flex items-center space-x-2 z-50"
      >
        <div className="text-white text-xl font-bold">+</div>
        <span>Print Document</span>
      </button>
      
      {/* File Selection Modal */}
      <FileSelectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        files={metricsData.results}
        onSelectFile={handleSelectFile}
        selectedFiles={selectedFiles} // Pass selected files
      />
    </div>
  );
};

export default StatusPage;
