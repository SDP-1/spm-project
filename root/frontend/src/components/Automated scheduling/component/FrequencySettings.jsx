import React from "react";

const FrequencySettings = ({
  frequencyType,
  setFrequencyType,
  frequencyValue,
  setFrequencyValue,
  specificTime,
  setSpecificTime,
  disable,
}) => (
  <div className="mb-4 border rounded-md border-neutral-200 p-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Frequency</label>
    <select
      value={frequencyType}
      onChange={(e) => !disable && setFrequencyType(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      disabled={disable}
    >
      <option value="Daily">Daily 12:00 am</option>
      <option value="Hourly">By Hourly</option>
      <option value="SpecificTime">Specific time</option>
    </select>

    {frequencyType === "Hourly" && (
      <input
        type="number"
        value={frequencyValue}
        onChange={(e) => !disable && setFrequencyValue(Number(e.target.value))}
        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter hours (e.g., 8 for every 8 hours)"
        disabled={disable}
      />
    )}

    {frequencyType === "SpecificTime" && (
      <input
        type="time"
        value={specificTime}
        onChange={(e) => !disable && setSpecificTime(e.target.value)}
        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        disabled={disable}
      />
    )}
  </div>
);

export default FrequencySettings;
