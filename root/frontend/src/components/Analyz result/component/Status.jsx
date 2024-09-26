import React from "react";

const Stats = ({ data }) => {
  const getCyclomaticComplexityStatus = (value) => {
    if (value <= 5) return { text: "Good", color: "bg-green-500" };
    if (value <= 10) return { text: "Average", color: "bg-yellow-500" };
    return { text: "Poor", color: "bg-red-500" };
  };

  const getHalsteadBugPropensityStatus = (value) => {
    if (value < 0.05) return { text: "Good", color: "bg-green-500" };
    if (value <= 0.1) return { text: "Average", color: "bg-yellow-500" };
    return { text: "Poor", color: "bg-red-500" };
  };

  const getHalsteadDifficultyStatus = (value) => {
    if (value < 5) return { text: "Good", color: "bg-green-500" };
    if (value <= 10) return { text: "Average", color: "bg-yellow-500" };
    return { text: "Poor", color: "bg-red-500" };
  };

  const getHalsteadEffortStatus = (value) => {
    if (value < 1000) return { text: "Good", color: "bg-green-500" };
    if (value <= 2000) return { text: "Average", color: "bg-yellow-500" };
    return { text: "Poor", color: "bg-red-500" };
  };

  const getHalsteadTimeRequiredStatus = (value) => {
    if (value < 60) return { text: "Good", color: "bg-green-500" };
    if (value <= 120) return { text: "Average", color: "bg-yellow-500" };
    return { text: "Poor", color: "bg-red-500" };
  };

  const getHalsteadVolumeStatus = (value) => {
    if (value < 100) return { text: "Good", color: "bg-green-500" };
    if (value <= 300) return { text: "Average", color: "bg-yellow-500" };
    return { text: "Poor", color: "bg-red-500" };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Cyclomatic Complexity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Cyclomatic Complexity</h3>
        <p>{data.cyclomatic_complexity}</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`${
                getCyclomaticComplexityStatus(data.cyclomatic_complexity).color
              } h-2.5 rounded-full`}
              style={{
                width: `${Math.min(
                  (data.cyclomatic_complexity / 15) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <span>
            {getCyclomaticComplexityStatus(data.cyclomatic_complexity).text}
          </span>
        </div>
      </div>

      {/* Lines of Code (LOC) */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Lines of Code (LOC)</h3>
        <p>{data.loc}</p>
      </div>

      {/* Comment Ratio */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Comment Ratio</h3>
        <p>{data.comment_ratio}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${
              data.comment_ratio >= 15 ? "bg-green-500" : "bg-red-500"
            } h-2.5 rounded-full`}
            style={{ width: `${Math.min(data.comment_ratio, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Halstead Bug Propensity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Halstead Bug Propensity</h3>
        <p>{data.halstead_bugprop}</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`${
                getHalsteadBugPropensityStatus(data.halstead_bugprop).color
              } h-2.5 rounded-full`}
              style={{
                width: `${Math.min(data.halstead_bugprop * 100, 100)}%`,
              }}
            ></div>
          </div>
          <span>
            {getHalsteadBugPropensityStatus(data.halstead_bugprop).text}
          </span>
        </div>
      </div>

      {/* Halstead Difficulty */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Halstead Difficulty</h3>
        <p>{data.halstead_difficulty}</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`${
                getHalsteadDifficultyStatus(data.halstead_difficulty).color
              } h-2.5 rounded-full`}
              style={{
                width: `${Math.min(
                  (data.halstead_difficulty / 50) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <span>
            {getHalsteadDifficultyStatus(data.halstead_difficulty).text}
          </span>
        </div>
      </div>

      {/* Halstead Effort */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Halstead Effort</h3>
        <p>{data.halstead_effort}</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`${
                getHalsteadEffortStatus(data.halstead_effort).color
              } h-2.5 rounded-full`}
              style={{
                width: `${Math.min(
                  (data.halstead_effort / 100000) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <span>{getHalsteadEffortStatus(data.halstead_effort).text}</span>
        </div>
      </div>

      {/* Halstead Time Required */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Halstead Time Required</h3>
        <p>{data.halstead_timerequired} seconds</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`${
                getHalsteadTimeRequiredStatus(data.halstead_timerequired).color
              } h-2.5 rounded-full`}
              style={{
                width: `${Math.min(
                  (data.halstead_timerequired / 10000) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <span>
            {getHalsteadTimeRequiredStatus(data.halstead_timerequired).text}
          </span>
        </div>
      </div>

      {/* Halstead Volume */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Halstead Volume</h3>
        <p>{data.halstead_volume}</p>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`${
                getHalsteadVolumeStatus(data.halstead_volume).color
              } h-2.5 rounded-full`}
              style={{
                width: `${Math.min((data.halstead_volume / 5000) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <span>{getHalsteadVolumeStatus(data.halstead_volume).text}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
