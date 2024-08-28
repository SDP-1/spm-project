import React from "react";

const FrequencySettings = ({
  frequencyType,
  setFrequencyType,
  frequencyValue,
  setFrequencyValue,
  specificDate,
  setSpecificDate,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Frequency</label>
    <select
      value={frequencyType}
      onChange={(e) => setFrequencyType(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="Daily">Daily</option>
      <option value="Hourly">Hourly</option>
      <option value="SpecificDate">Specific Date</option>
    </select>

    {frequencyType === "Hourly" && (
      <input
        type="number"
        value={frequencyValue}
        onChange={(e) => setFrequencyValue(Number(e.target.value))}
        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter hours (e.g., 8 for every 8 hours)"
      />
    )}

    {frequencyType === "SpecificDate" && (
      <input
        type="datetime-local"
        value={specificDate}
        onChange={(e) => setSpecificDate(e.target.value)}
        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    )}
  </div>
);

export default FrequencySettings;
