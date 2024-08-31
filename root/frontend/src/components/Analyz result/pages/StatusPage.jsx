import React from "react";
import Status from "../component/Status";
import QualityGate from "../component/QualityGate ";

const StatusPage = () => {
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
    <div>
      <QualityGate />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Code Metrics</h1>
        <Status data={metricsData} />
      </div>
    </div>
  );
};

export default StatusPage;
