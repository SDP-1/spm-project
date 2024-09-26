import React, { useState } from "react";
import Stats from "./Status"; // Adjust the import path if necessary

const QualityGate = ({ data }) => {
  const [activeTab, setActiveTab] = useState("fileByFile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Calculate overall metrics
  const overallMetrics = {
    cyclomatic_complexity: 0,
    loc: 0,
    comment_ratio: 0,
    halstead_bugprop: 0,
    halstead_difficulty: 0,
    halstead_effort: 0,
    halstead_timerequired: 0,
    halstead_volume: 0,
  };

  const fileCount = Object.keys(data).length;

  Object.values(data).forEach((fileData) => {
    overallMetrics.cyclomatic_complexity += fileData.cyclomatic_complexity;
    overallMetrics.loc += fileData.loc;
    overallMetrics.comment_ratio += fileData.comment_ratio;
    overallMetrics.halstead_bugprop += fileData.halstead_bugprop;
    overallMetrics.halstead_difficulty += fileData.halstead_difficulty;
    overallMetrics.halstead_effort += fileData.halstead_effort;
    overallMetrics.halstead_timerequired += fileData.halstead_timerequired;
    overallMetrics.halstead_volume += fileData.halstead_volume;
  });

  if (fileCount > 0) {
    overallMetrics.comment_ratio /= fileCount; // Average comment ratio
    overallMetrics.halstead_bugprop /= fileCount; // Average bug propensity
    overallMetrics.halstead_difficulty /= fileCount; // Average difficulty
    overallMetrics.halstead_effort /= fileCount; // Average effort
    overallMetrics.halstead_timerequired /= fileCount; // Average time required
    overallMetrics.halstead_volume /= fileCount; // Average volume
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">File Analysis</h1>

      {/* Tab Navigation */}
      <nav className="flex space-x-4 text-[#41889e] mb-6">
        <a
          href="#"
          onClick={() => handleTabClick("fileByFile")}
          className={`hover:underline ${
            activeTab === "fileByFile" ? "font-semibold underline" : ""
          }`}
        >
          File By File
        </a>
        <a
          href="#"
          onClick={() => handleTabClick("overallCode")}
          className={`hover:underline ${
            activeTab === "overallCode" ? "font-semibold underline" : ""
          }`}
        >
          Overall Code
        </a>
      </nav>

      {/* Tab Content */}
      {activeTab === "fileByFile" ? (
        <div>
          {Object.keys(data).map((filePath, index) => {
            // Extract the file name from the file path
            const fileName = filePath.split("\\").pop(); // For Windows paths
            // const fileName = filePath.split("/").pop(); // For Unix-like paths

            return (
              <div key={index} className="mb-6">
                {/* Display file name with number */}
                <h2 className="text-xl font-semibold mb-4">
                  {index + 1}). {fileName}
                </h2>

                {/* Render the stats for each file */}
                <Stats data={data[filePath]} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Overall Code Metrics</h2>
          <Stats data={overallMetrics} />
        </div>
      )}
    </div>
  );
};

export default QualityGate;
