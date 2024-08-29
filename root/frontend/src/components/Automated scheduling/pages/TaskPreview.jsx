import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaStar, FaEllipsisV, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskPreview = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(null); // State to track which task's menu is open
  const deleteTaskIdRef = useRef(null); // Use a ref to track which task to delete
  const menuRef = useRef(null); // Ref to track the menu element
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null); // Close the menu if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tasks.filter(
      (task) =>
        task.taskName.toLowerCase().includes(value) ||
        task.description.toLowerCase().includes(value)
    );
    setFilteredTasks(filtered);
  };

  const toggleStar = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, starred: !task.starred } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleDelete = async () => {
    const taskId = deleteTaskIdRef.current; // Use ref to get the task ID

    if (!taskId) {
      console.error("No task ID to delete");
      return;
    }

    console.log("Attempting to delete task with ID:", taskId); // Debugging log

    try {
      await axios.delete(`/api/tasks/${taskId}`);

      // Update the tasks state by removing the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      // Update the filteredTasks state similarly
      setFilteredTasks((prevFilteredTasks) =>
        prevFilteredTasks.filter((task) => task._id !== taskId)
      );

      // Optionally close any UI menu related to the task
      setShowMenu(null);
      deleteTaskIdRef.current = null; // Reset deleteTaskId after successful deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };

  const confirmDelete = (taskId) => {
    deleteTaskIdRef.current = taskId; // Set ref value

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );

    if (confirmDelete) {
      handleDelete(); // Call handleDelete after confirming
    } else {
      deleteTaskIdRef.current = null; // Reset ref if the user cancels
    }
  };

  const handleShowDetails = (taskId) => {
    navigate(`/tasks/${taskId}`); // Navigate to task details page
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Scheduled Tasks</h2>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center mb-4 border border-gray-300 rounded-lg" style={{ width: '400px' }}>
        <FaSearch className="ml-3 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for tasks..."
          className="flex-1 px-3 py-2 outline-none bg-transparent"
        />
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-lg relative"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-indigo-700">
                {task.taskName}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShowDetails(task._id)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Show more details
                </button>
                <button onClick={() => toggleStar(task._id)}>
                  <FaStar
                    className={`text-xl ${
                      task.starred ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                </button>
                <div className="relative" ref={menuRef}>
                  <FaEllipsisV
                    className="text-gray-500 cursor-pointer text-sm"
                    onClick={() =>
                      setShowMenu(showMenu === task._id ? null : task._id)
                    }
                  />
                  {showMenu === task._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2">
                      <button
                        className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100 text-xs"
                        onClick={() => confirmDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPreview;