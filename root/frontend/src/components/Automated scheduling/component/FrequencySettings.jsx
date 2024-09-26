import React from "react";

const FrequencySettings = ({
  frequencyType,
  setFrequencyType,
  frequencyValue,
  setFrequencyValue,
  specificDate,
  setSpecificDate,
  disable
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Frequency</label>
    <select
      value={frequencyType}
      onChange={(e) => !disable && setFrequencyType(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      disabled={disable}
    >
      <option value="Daily">Daily</option>
      <option value="Hourly">Hourly</option>
      <option value="SpecificDate">Specific Date</option>
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

    {frequencyType === "SpecificDate" && (
      <input
        type="datetime-local"
        value={specificDate}
        onChange={(e) => !disable && setSpecificDate(e.target.value)}
        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        disabled={disable}
      />
    )}
  </div>
);

export default FrequencySettings;
