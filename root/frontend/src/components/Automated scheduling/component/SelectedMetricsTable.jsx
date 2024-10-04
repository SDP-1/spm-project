import React from "react";

const SelectedMetricsTable = ({ tools, selectedTools, toolMetrics }) => (
  <table className="min-w-full bg-white border border-gray-300 mt-4 shadow-md">
    <thead>
      <tr className="border-b bg-gray-200">
        <th className="py-2 px-4 text-left">Tool</th>
        <th className="py-2 px-4 text-left">Metrics</th>
      </tr>
    </thead>
    <tbody>
      {tools
        .filter((tool) => selectedTools.includes(tool.name))
        .map((tool) => (
          <tr key={tool.name} className="border-b hover:bg-gray-100 transition-colors">
            <td className="py-2 px-4">{tool.name}</td>
            <td className="py-2 px-4">
              <ul className="list-disc ml-5">
                {tool.metrics
                  .filter(
                    (metric) =>
                      toolMetrics[tool.name] && toolMetrics[tool.name][metric]
                  )
                  .map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
              </ul>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default SelectedMetricsTable;
