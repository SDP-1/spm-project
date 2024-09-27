// StatusPage.jsx
import React, { useState, useEffect } from "react";
import OverallCodeAnalysis from "../component/OverallCodeAnalysis"; 
import FileList from "../component/FileList"; 
import FilePreview from "../component/FilePreview"; 

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

  // Initialize selectedFile to the first file if available
  const [selectedFile, setSelectedFile] = useState(Object.keys(metricsData.results)[0] || null);
  const [activeTab, setActiveTab] = useState("fileByFile");

  // Effect to update selectedFile when metricsData results change
  useEffect(() => {
    if (metricsData && metricsData.results) {
      const files = Object.keys(metricsData.results);
      if (files.length > 0 && !selectedFile) {
        setSelectedFile(files[0]); // Set to the first file if no file is selected
      }
    }
  }, [metricsData.results]); // Dependency array ensures this runs when results change

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">File Analysis</h1>

      {/* Tab Navigation */}
      <nav className="flex space-x-4 text-[#41889e] mb-6">
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

      {/* Tab Content */}
      {activeTab === "fileByFile" ? (
        <div className="flex">
          <div className="w-1/4">
            <FileList 
              files={metricsData.results} 
              selectedFile={selectedFile} 
              onSelectFile={handleSelectFile} 
            />
          </div>
          <div className="w-3/4 ml-6 mt-4">
            {selectedFile && (
              <FilePreview 
                data={metricsData.results[selectedFile]} 
                fileName={selectedFile.split("\\").pop()} 
              />
            )}
          </div>
        </div>
      ) : (
        <OverallCodeAnalysis data={metricsData.results} />
      )}
    </div>
  );
};

export default StatusPage;
