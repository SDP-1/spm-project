import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Button from '../component/Button';
import SelectionMethod from '../component/SelectionMethod';
import FrequencySettings from '../component/FrequencySettings';
import ToolSelector from '../component/ToolSelector';
import MetricSelector from '../component/MetricSelector';
import SelectedMetricsTable from '../component/SelectedMetricsTable';
import ErrorMessage from '../component/ErrorMessage';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequencyType, setFrequencyType] = useState('Daily');
  const [frequencyValue, setFrequencyValue] = useState(8);
  const [specificDate, setSpecificDate] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolMetrics, setToolMetrics] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        const taskData = response.data;
        setTask(taskData);
        setTaskName(taskData.taskName);
        setDescription(taskData.description);
        setRecurring(taskData.recurring);
        setFrequencyType(taskData.frequencyType || 'Daily');
        setFrequencyValue(taskData.frequencyValue || 8);
        setSpecificDate(taskData.specificDate ? new Date(taskData.specificDate).toISOString().slice(0, 16) : '');
        setSelectedTools(taskData.selectedTools || []);
        setToolMetrics(taskData.toolMetrics || {});
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError('Failed to fetch task details');
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/tasks/${id}`, {
        taskName,
        description,
        recurring,
        frequencyType,
        frequencyValue,
        specificDate: specificDate ? new Date(specificDate).toISOString() : '',
        selectedTools,
        toolMetrics,
      });
      navigate('/'); // Redirect to task list after update
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      navigate('/'); // Redirect to task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  if (!task) return <p>Loading...</p>;

  const tools = [
    { name: 'Cyclomatic Complexity', metrics: ['Complexity Score', 'Cyclomatic Complexity'] },
    { name: 'Halstead Metrics', metrics: ['Volume', 'Difficulty', 'Effort'] },
    { name: 'Maintainability Index', metrics: ['Maintainability Index'] },
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

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Task Details</h2>
        {error && <ErrorMessage error={error} />}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>

        <SelectionMethod
          selectionMethod={recurring ? 'Recurring' : 'For Now'}
          handleSelectionMethodChange={(method) => setRecurring(method === 'Recurring')}
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

        <div className="text-sm text-gray-500 mb-4">
          <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
          {task.createdAt !== task.updatedAt && (
            <p>Updated at: {new Date(task.updatedAt).toLocaleString()}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={handleUpdate}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <FaEdit className="mr-2" /> Update
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
