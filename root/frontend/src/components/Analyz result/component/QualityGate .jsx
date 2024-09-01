import React, { useState } from "react";
import Stats from "../component/Status";

const QualityGate = ({ statsData }) => {
  const [activeTab, setActiveTab] = useState(""); // Keeps track of which tab is active

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const metricsData = {
    cyclomatic_complexity: 2,
    loc: 20,
    comment_ratio: 0,
    halstead_bugprop: 0.072,
    halstead_difficulty: 8.45,
    halstead_effort: 1834.757,
    halstead_timerequired: 101.931,
    halstead_volume: 217.131,
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold mr-4">Quality Gate</h2>
        <p className="bg-green-100 text-green-600 py-1 px-3 rounded">Passed</p>
      </div>
      <nav className="flex space-x-4 text-blue-500">
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

      {/* Render the Stats component when 'File By File' is selected */}
      {activeTab === "fileByFile" && <Stats data={metricsData} />}
    </div>
  );
};

export default QualityGate;
