import React, { useState } from "react";
import Button from "../component/Button";
import TaskForm from "../component/TaskForm";
import SelectionMethod from "../component/SelectionMethod";
import FrequencySettings from "../component/FrequencySettings";
import ToolSelector from "../component/ToolSelector";
import MetricSelector from "../component/MetricSelector";
import SelectedMetricsTable from "../component/SelectedMetricsTable";
import ErrorMessage from "../component/ErrorMessage";
import axios from "axios";

const TaskScheduler = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolMetrics, setToolMetrics] = useState({});
  const [recurring, setRecurring] = useState(false);
  const [frequencyType, setFrequencyType] = useState("Daily");
  const [frequencyValue, setFrequencyValue] = useState(8);
  const [specificDate, setSpecificDate] = useState("");
  const [selectionMethod, setSelectionMethod] = useState("For Now");
  const [error, setError] = useState("");

  const tools = [
    {
      name: "Cyclomatic Complexity",
      metrics: ["Complexity Score", "Cyclomatic Complexity"],
    },
    { name: "Halstead Metrics", metrics: ["Volume", "Difficulty", "Effort"] },
    { name: "Maintainability Index", metrics: ["Maintainability Index"] },
  ];

  const handleToolSelection = (tool) => {
    setSelectedTools((prev) => {
      const newSelection = prev.includes(tool)
        ? prev.filter((t) => t !== tool)
        : [...prev, tool];
      if (!toolMetrics[tool]) {
        setToolMetrics((prevMetrics) => ({
          ...prevMetrics,
          [tool]: tools
            .find((t) => t.name === tool)
            .metrics.reduce((acc, metric) => ({ ...acc, [metric]: true }), {}),
        }));
      }
      return newSelection;
    });
    setError("");
  };

  const handleMetricChange = (tool, metric) => {
    setToolMetrics((prev) => {
      const updatedMetrics = {
        ...prev,
        [tool]: {
          ...prev[tool],
          [metric]: !prev[tool][metric],
        },
      };

      const allMetricsUnselected = !Object.values(
        updatedMetrics[tool]
      ).includes(true);
      if (allMetricsUnselected) {
        setError("You must select at least one metric for each tool.");
        return prev;
      }

      setError("");
      return updatedMetrics;
    });
  };

  const handleSelectionMethodChange = (method) => {
    setSelectionMethod(method);
    setRecurring(method === "Recurring");
    setError("");
  };

  const scheduleTask = async () => {
    if (!taskName) {
      setError("Task name is required.");
      return;
    }
    if (!description) {
      setError("Description is required.");
      return;
    }
    if (selectedTools.length === 0) {
      setError("You must select at least one tool.");
      return;
    }

    const invalidToolMetrics = selectedTools.find((tool) => {
      return !Object.values(toolMetrics[tool] || {}).includes(true);
    });
    if (invalidToolMetrics) {
      setError("You must select at least one metric for each selected tool.");
      return;
    }

    setError("");
    try {
      const taskData = {
        taskName,
        description,
        selectedTools,
        toolMetrics,
        recurring,
        frequencyType,
        frequencyValue,
        specificDate,
        selectionMethod,
      };

      const response = await axios.post("/api/tasks", taskData);

      if (response.status === 200) {
        alert("Task scheduled successfully!");
        setTaskName("");
        setDescription("");
        setSelectedTools([]);
        setToolMetrics({});
        setRecurring(false);
        setFrequencyType("Daily");
        setFrequencyValue(8);
        setSpecificDate("");
        setSelectionMethod("For Now");
      }
    } catch (error) {
      console.error("Error scheduling task:", error);
      setError("Failed to schedule task. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Schedule a New Code Analysis Task
      </h2>

      <TaskForm
        taskName={taskName}
        setTaskName={setTaskName}
        description={description}
        setDescription={setDescription}
      />

      <SelectionMethod
        selectionMethod={selectionMethod}
        handleSelectionMethodChange={handleSelectionMethodChange}
      />

      {recurring && (
        <FrequencySettings
          frequencyType={frequencyType}
          setFrequencyType={setFrequencyType}
          frequencyValue={frequencyValue}
          setFrequencyValue={setFrequencyValue}
          specificDate={specificDate}
          setSpecificDate={setSpecificDate}
        />
      )}

      <ToolSelector
        tools={tools}
        selectedTools={selectedTools}
        handleToolSelection={handleToolSelection}
      />

      {selectedTools.length > 0 && (
        <>
          <MetricSelector
            tools={tools}
            selectedTools={selectedTools}
            toolMetrics={toolMetrics}
            handleMetricChange={handleMetricChange}
          />
          <SelectedMetricsTable
            tools={tools}
            selectedTools={selectedTools}
            toolMetrics={toolMetrics}
          />
        </>
      )}

      <div className="mb-4">
        <ErrorMessage error={error} />
        <Button
          onClick={scheduleTask}
          className="bg-indigo-700 text-white font-bold py-2 px-4 hover:bg-indigo-800 mt-4"
        >
          Schedule Task
        </Button>
      </div>
    </div>
  );
};

export default TaskScheduler;
