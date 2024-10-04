import React from "react";

const Stats = ({ data }) => {
  // Helper functions for status evaluation
  const getCyclomaticComplexityStatus = (value) => {
    if (value <= 5) return { text: "LOW", color: "bg-green-300" };
    if (value <= 10) return { text: "AVERAGE", color: "bg-yellow-300" };
    return { text: "HIGH", color: "bg-red-300" };
  };

  const getHalsteadBugPropensityStatus = (value) => {
    if (value < 0.05) return { text: "LOW", color: "bg-green-300" };
    if (value <= 0.1) return { text: "AVERAGE", color: "bg-yellow-300" };
    return { text: "HIGH", color: "bg-red-300" };
  };

  const getHalsteadDifficultyStatus = (value) => {
    if (value < 5) return { text: "LOW", color: "bg-green-300" };
    if (value <= 10) return { text: "AVERAGE", color: "bg-yellow-300" };
    return { text: "HIGH", color: "bg-red-300" };
  };

  const getHalsteadEffortStatus = (value) => {
    if (value < 1000) return { text: "LOW", color: "bg-green-300" };
    if (value <= 2000) return { text: "AVERAGE", color: "bg-yellow-300" };
    return { text: "HIGH", color: "bg-red-300" };
  };

  const getHalsteadTimeRequiredStatus = (value) => {
    if (value < 60) return { text: "LOW", color: "bg-green-300" };
    if (value <= 120) return { text: "AVERAGE", color: "bg-yellow-300" };
    return { text: "HIGH", color: "bg-red-300" };
  };

  const getHalsteadVolumeStatus = (value) => {
    if (value < 100) return { text: "LOW", color: "bg-green-300" };
    if (value <= 300) return { text: "AVERAGE", color: "bg-yellow-300" };
    return { text: "HIGH", color: "bg-red-300" };
  };

  return (
    <div className="w-full p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Code Quality Statistics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cyclomatic Complexity */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Cyclomatic Complexity
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              getCyclomaticComplexityStatus(data.cyclomatic_complexity).color
            }`}
          >
            {getCyclomaticComplexityStatus(data.cyclomatic_complexity).text}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.cyclomatic_complexity}
          </p>
          <p className="text-sm text-gray-500">
            Measures the complexity of a program
          </p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.cyclomatic_complexity <= 5
                ? "Good job! Your code has low complexity. Keep it up!"
                : data.cyclomatic_complexity <= 10
                ? "Consider simplifying your code."
                : "Refactor your code to reduce complexity."}
            </p>
          </div>
        </div>

        {/* Lines of Code (LOC) */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Lines of Code (LOC)
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              data.loc <= 100 ? "bg-green-300" : "bg-yellow-300"
            }`}
          >
            {data.loc <= 100 ? "LOW" : "HIGH"}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">{data.loc}</p>
          <p className="text-sm text-gray-500">Total lines of code</p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.loc <= 100
                ? "Concise code. Well done!"
                : "Consider reducing the number of lines for better readability."}
            </p>
          </div>
        </div>

        {/* Comment Ratio */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">Comment Ratio</h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              data.comment_ratio >= 15 ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {data.comment_ratio >= 15 ? "LOW" : "HIGH"}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.comment_ratio}%
          </p>
          <p className="text-sm text-gray-500">Ratio of comments to code</p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.comment_ratio >= 15
                ? "Good comment coverage!"
                : "Add more comments to improve code readability."}
            </p>
          </div>
        </div>

        {/* Halstead Bug Propensity */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Halstead Bug Propensity
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              getHalsteadBugPropensityStatus(data.halstead_bugprop).color
            }`}
          >
            {getHalsteadBugPropensityStatus(data.halstead_bugprop).text}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.halstead_bugprop}
          </p>
          <p className="text-sm text-gray-500">
            Estimated number of bugs in the implementation
          </p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.halstead_bugprop < 0.05
                ? "Low bug probability. Great job!"
                : "Consider reviewing your code for potential bugs."}
            </p>
          </div>
        </div>

        {/* Halstead Difficulty */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Halstead Difficulty
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              getHalsteadDifficultyStatus(data.halstead_difficulty).color
            }`}
          >
            {getHalsteadDifficultyStatus(data.halstead_difficulty).text}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.halstead_difficulty}
          </p>
          <p className="text-sm text-gray-500">Difficulty level of the code</p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.halstead_difficulty < 5
                ? "Low difficulty. Keep up the good work!"
                : "Consider simplifying complex parts of your code."}
            </p>
          </div>
        </div>

        {/* Halstead Effort */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Halstead Effort
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              getHalsteadEffortStatus(data.halstead_effort).color
            }`}
          >
            {getHalsteadEffortStatus(data.halstead_effort).text}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.halstead_effort}
          </p>
          <p className="text-sm text-gray-500">Effort required for coding</p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.halstead_effort < 1000
                ? "Low effort required. Great job!"
                : "Review your implementation for possible optimizations."}
            </p>
          </div>
        </div>

        {/* Halstead Time Required */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Halstead Time Required
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              getHalsteadTimeRequiredStatus(data.halstead_timerequired).color
            }`}
          >
            {getHalsteadTimeRequiredStatus(data.halstead_timerequired).text}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.halstead_timerequired} s
          </p>
          <p className="text-sm text-gray-500">
            Time required to understand the code
          </p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.halstead_timerequired < 60
                ? "Low time requirement. Great job!"
                : "Consider refactoring for improved readability."}
            </p>
          </div>
        </div>

        {/* Halstead Volume */}
        <div className="bg-white rounded-lg p-6 shadow-lg relative border-l-4 border-blue-500">
          <h2 className="font-semibold text-lg text-gray-700">
            Halstead Volume
          </h2>
          <span
            className={`absolute top-4 right-4 text-xs py-1 px-2 rounded-full ${
              getHalsteadVolumeStatus(data.halstead_volume).color
            }`}
          >
            {getHalsteadVolumeStatus(data.halstead_volume).text}
          </span>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            {data.halstead_volume}
          </p>
          <p className="text-sm text-gray-500">Volume of the code</p>
          <div className="mt-4">
            <p className="font-semibold text-sm text-gray-600">
              AI Suggestion:
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded-md mt-1 text-gray-700">
              {data.halstead_volume < 100
                ? "Good volume! Code is concise."
                : "Consider reducing the volume for better clarity."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
