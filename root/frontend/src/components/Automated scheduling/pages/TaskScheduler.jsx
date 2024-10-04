import React, { useState, useEffect } from "react";
import Button from "../component/Button";
import TaskForm from "../component/TaskForm";
import SelectionMethod from "../component/SelectionMethod";
import FrequencySettings from "../component/FrequencySettings";
import ToolSelector from "../component/ToolSelector";
import MetricSelector from "../component/MetricSelector";
import SelectedMetricsTable from "../component/SelectedMetricsTable";
import ErrorMessage from "../component/ErrorMessage";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa"; // Back icon
import { FaCalendarCheck } from "react-icons/fa"; // Schedule task icon
import { FaArrowRight } from "react-icons/fa"; // Import the right arrow icon

const TaskScheduler = ({ onClose, refreshTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolMetrics, setToolMetrics] = useState({});
  const [recurring, setRecurring] = useState(false);
  const [frequencyType, setFrequencyType] = useState("Daily");
  const [frequencyValue, setFrequencyValue] = useState(8);
  const [SpecificTime, setSpecificTime] = useState("");
  const [selectionMethod, setSelectionMethod] = useState("For Now");
  const [error, setError] = useState("");
  const [projectId, setProjectId] = useState(""); // Store projectId separately
  const [projects, setProjects] = useState([]); // To store fetched projects

  // Step control state
  const [currentStep, setCurrentStep] = useState(1);

  const tools = [
    {
      name: "Cyclomatic Complexity",
      metrics: ["Complexity Score", "Cyclomatic Complexity"],
    },
    { name: "Halstead Metrics", metrics: ["Volume", "Difficulty", "Effort"] },
    { name: "Maintainability Index", metrics: ["Maintainability Index"] },
  ];

  // Fetch real projects from the database on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects"); // Adjust the endpoint if necessary
        setProjects(response.data); // Assuming response contains an array of projects with { _id, projectName }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

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

  // Updated project selection to ensure it works with the dropdown
  const handleProjectSelection = (projectId) => {
    setProjectId(projectId); // Set projectId only
  };

  const scheduleTask = async () => {
    // Validate inputs
    if (!taskName) {
      setError("Task name is required.");
      return;
    }
    if (!description) {
      setError("Description is required.");
      return;
    }
    if (!projectId) {
      setError("Project is required.");
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

    if (frequencyType === "SpecificTime" && !SpecificTime) {
      setError("Please select a specific time.");
      return;
    }

    if (
      frequencyType === "Hourly" &&
      (frequencyValue <= 0 || isNaN(frequencyValue))
    ) {
      setError("Please enter a valid hourly value greater than 0.");
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
        SpecificTime,
        selectionMethod,
        projectId,
      };

      const response = await axios.post("/api/task/add", taskData);

      if (response.status === 200) {
        alert("Task scheduled successfully!"); // Show alert before closing modal
        onClose(); // Close the modal
        refreshTasks(); // Refresh the task list in TaskPreview

        // Reset fields
        setTaskName("");
        setDescription("");
        setSelectedTools([]);
        setToolMetrics({});
        setRecurring(false);
        setFrequencyType("Daily");
        setFrequencyValue(8);
        setSpecificTime("");
        setSelectionMethod("For Now");
        setProjectId(""); // Clear the projectId as well
      }
    } catch (error) {
      console.error("Error scheduling task:", error);
      setError("Failed to schedule task. Please try again.");
    }
  };

  // Handlers for navigation between steps
  const handleNextStep = () => setCurrentStep(2);
  const handlePrevStep = () => setCurrentStep(1);

  return (
    <div className="bg-white p-3 rounded-lg max-w-3xl mx-auto">
      {currentStep === 1 && (
        <>
          <div className="h-85 overflow-auto">
            {" "}
            {/* 80 is a value in Tailwind's spacing scale (20rem) */}
            <h2 className="text-xl font-bold text-black mb-4">
              Schedule a New Code Analysis Task
            </h2>
            {/* Step 1: Task Info */}
            <TaskForm
              taskName={taskName}
              setTaskName={setTaskName}
              description={description}
              setDescription={setDescription}
              projects={projects} // Pass fetched projects to TaskForm
              projectId={projectId} // Pass projectId to control the dropdown
              setProject={handleProjectSelection} // Update selection handler
              disable={false} // Adjust as needed
            />
          </div>

          {error && <ErrorMessage error={error} />}

          {/* Wrap the button and other elements in a relative container */}
          <div className="relative">
            <div className="flex justify-end mt-12">
              <Button
                onClick={handleNextStep}
                className="bg-[#4F46E5] text-white font-bold py-2 px-4 hover:bg-[#8f89ee] hover:text-white flex items-center absolute" // Absolute position classes
              >
                Next
                <FaArrowRight className="ml-2" /> {/* Right arrow icon */}
              </Button>
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          {/* Step 2: Task Details */}
          <div className="h-[calc(70vh-9rem)] overflow-auto">
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
                SpecificTime={SpecificTime}
                setSpecificTime={setSpecificTime}
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
          </div>
          {error && <ErrorMessage error={error} />}

          {/* Container for Fixed Position Buttons */}
          <div className="relative">
            <div className="flex justify-between mt-4 absolute  left-0 right-0 p-2 bg-white">
              <Button
                onClick={handlePrevStep}
                className="bg-gray-400 text-white font-bold py-2 px-4 hover:bg-[#8f89ee] hover:text-white flex items-center"
              >
                <FaArrowLeft className="mr-2" /> {/* Left arrow icon */}
                Back
              </Button>
              <Button
                onClick={scheduleTask}
                className="bg-[#4F46E5] text-white font-bold py-2 px-4 hover:bg-[#8f89ee] hover:text-white flex items-center"
              >
                <FaCalendarCheck className="mr-2" /> {/* Calendar check icon */}
                Schedule Task
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskScheduler;
