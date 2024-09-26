import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaCheck, FaSave } from "react-icons/fa";
import Button from "../component/Button";
import SelectionMethod from "../component/SelectionMethod";
import FrequencySettings from "../component/FrequencySettings";
import ToolSelector from "../component/ToolSelector";
import MetricSelector from "../component/MetricSelector";
import SelectedMetricsTable from "../component/SelectedMetricsTable";
import ErrorMessage from "../component/ErrorMessage";
import TaskForm from "../component/TaskForm";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [initialTask, setInitialTask] = useState(null);
  const [error, setError] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(""); // Change to store project ID
  const [projects, setProjects] = useState([]); // Initialize as an empty array
  const [recurring, setRecurring] = useState(false);
  const [frequencyType, setFrequencyType] = useState("Daily");
  const [frequencyValue, setFrequencyValue] = useState(8);
  const [specificDate, setSpecificDate] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolMetrics, setToolMetrics] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/task/${id}`);
        const taskData = response.data;
        setTask(taskData);
        setInitialTask(taskData);
        setTaskName(taskData.taskName);
        setDescription(taskData.description);
        setProjectId(taskData.projectId || ""); // Set project ID from task data
        setRecurring(taskData.recurring);
        setFrequencyType(taskData.frequencyType || "Daily");
        setFrequencyValue(taskData.frequencyValue || 8);
        setSpecificDate(
          taskData.specificDate
            ? new Date(taskData.specificDate).toISOString().slice(0, 16)
            : ""
        );
        setSelectedTools(taskData.selectedTools || []);
        setToolMetrics(taskData.toolMetrics || {});
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError("Failed to fetch task details");
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`/api/projects`); // Fetch projects from your API
        setProjects(response.data); // Assuming response.data is an array of project objects
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects");
      }
    };

    fetchTask();
    fetchProjects(); // Call the fetchProjects function to get the project list
  }, [id]);

  const handleUpdate = async () => {
    if (isConfirmingUpdate) {
      setIsUpdating(true);
      try {
        await axios.put(`/api/task/${id}`, {
          taskName,
          description,
          projectId, // Include project ID in update payload
          recurring,
          frequencyType,
          frequencyValue,
          specificDate: specificDate
            ? new Date(specificDate).toISOString()
            : "",
          selectedTools,
          toolMetrics,
        });

        const updatedResponse = await axios.get(`/api/task/${id}`);
        const updatedTask = updatedResponse.data;
        setTask(updatedTask);
        setInitialTask(updatedTask);
        setIsEditing(false);
        setIsConfirmingUpdate(false);
      } catch (error) {
        console.error("Error updating task:", error);
        setError("Failed to update task");
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsConfirmingUpdate(true);
    }
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(`/api/task/${id}`);
        navigate("/task/showAll");
      } catch (error) {
        console.error("Error deleting task:", error);
        setError("Failed to delete task");
      }
    }
  };

  const handleCancel = () => {
    if (initialTask) {
      setTaskName(initialTask.taskName);
      setDescription(initialTask.description);
      setProjectId(initialTask.projectId || ""); // Reset project ID
      setRecurring(initialTask.recurring);
      setFrequencyType(initialTask.frequencyType || "Daily");
      setFrequencyValue(initialTask.frequencyValue || 8);
      setSpecificDate(
        initialTask.specificDate
          ? new Date(initialTask.specificDate).toISOString().slice(0, 16)
          : ""
      );
      setSelectedTools(initialTask.selectedTools || []);
      setToolMetrics(initialTask.toolMetrics || {});
    }
    setIsEditing(false);
    setIsConfirmingUpdate(false);
  };

  if (!task) return <p>Loading...</p>;

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
  };

  const handleMetricChange = (tool, metric) => {
    setToolMetrics((prev) => ({
      ...prev,
      [tool]: {
        ...prev[tool],
        [metric]: !prev[tool][metric],
      },
    }));
  };

  // Find the selected project name based on projectId
  const selectedProject = projects.find((proj) => proj.id === projectId);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto max-w-3xl bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold text-black mb-4">Task Details</h2>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 text-black bg-transparent border border-black px-2 py-1 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <FaEdit className="mr-1" /> Edit
          </Button>
        )}

        {error && <ErrorMessage error={error} />}

        {/* Replace individual inputs with TaskForm */}
        <TaskForm
          taskName={taskName}
          setTaskName={setTaskName}
          description={description}
          setDescription={setDescription}
          projects={projects} // Pass projects array
          project={projectId} // Pass the project ID
          setProject={setProjectId} // Update project ID on change
          selectedProjectName={selectedProject ? selectedProject.name : ""} // Pass the selected project name
          disable={!isEditing}
        />

        <SelectionMethod
          selectionMethod={recurring ? "Recurring" : "For Now"}
          handleSelectionMethodChange={(method) =>
            setRecurring(method === "Recurring")
          }
          disable={!isEditing}
        />

        {recurring && (
          <FrequencySettings
            frequencyType={frequencyType}
            setFrequencyType={setFrequencyType}
            frequencyValue={frequencyValue}
            setFrequencyValue={setFrequencyValue}
            specificDate={specificDate}
            setSpecificDate={setSpecificDate}
            disable={!isEditing}
          />
        )}

        <ToolSelector
          tools={tools}
          selectedTools={selectedTools}
          handleToolSelection={handleToolSelection}
          disable={!isEditing}
        />

        {selectedTools.length > 0 && (
          <>
            <MetricSelector
              tools={tools}
              selectedTools={selectedTools}
              toolMetrics={toolMetrics}
              handleMetricChange={handleMetricChange}
              disable={!isEditing}
            />
            <SelectedMetricsTable
              tools={tools}
              selectedTools={selectedTools}
              toolMetrics={toolMetrics}
            />
          </>
        )}

        <div className="text-sm text-gray-500 mb-4">
          <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
          <p>
            Updated at:{" "}
            {isEditing
              ? new Date().toLocaleString()
              : new Date(task.updatedAt).toLocaleString()}
          </p>
        </div>

        {isEditing && (
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={handleUpdate}
              className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUpdating}
            >
              {isConfirmingUpdate ? (
                <>
                  <FaCheck className="mr-2" /> Confirm Update
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save
                </>
              )}
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
            >
              Cancel
            </Button>
          </div>
        )}

        {!isEditing && (
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
            >
              <FaTrashAlt className="mr-2" /> Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
