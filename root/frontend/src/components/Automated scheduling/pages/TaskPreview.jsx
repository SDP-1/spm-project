import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskPreview = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleUpdate = (taskId) => {
    console.log('Update task', taskId);
  };

  const handleRemove = (taskId) => {
    console.log('Remove task', taskId);
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Scheduled Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left">Task Name</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Tools & Metrics</th>
            <th className="py-2 px-4 text-left">Schedule</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b">
              <td className="py-2 px-4 font-semibold text-indigo-700">{task.taskName}</td>
              <td className="py-2 px-4">{task.description}</td>
              <td className="py-2 px-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-1 px-2 text-left">Tool</th>
                      <th className="py-1 px-2 text-left">Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(task.toolMetrics).map(([tool, metrics]) => (
                      <tr key={tool}>
                        <td className="py-1 px-2 font-semibold">{tool}</td>
                        <td className="py-1 px-2">
                          <ul className="list-disc ml-4">
                            {Object.entries(metrics).map(([metric, isSelected]) =>
                              isSelected ? <li key={metric}>{metric}</li> : null
                            )}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="py-2 px-4">
                {task.recurring ? (
                  task.frequencyType === 'Hourly' ? (
                    `Every ${task.frequencyValue} hours`
                  ) : task.specificDate ? (
                    `On ${new Date(task.specificDate).toLocaleString()}`
                  ) : (
                    'N/A'
                  )
                ) : (
                  'One Time'
                )}
              </td>
              <td className="py-2 px-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleRemove(task._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPreview;
