import React from "react";
import Stats from "./Status"; // Adjust the import path if necessary

const OverallCodeAnalysis = ({ data }) => {
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Overall Code Metrics</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Stats data={overallMetrics} />
      </div>
    </div>
  );
};

export default OverallCodeAnalysis;
