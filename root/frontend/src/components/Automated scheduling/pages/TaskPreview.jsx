import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaStar, FaEllipsisV, FaSearch, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskPreview = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("updatedAt"); // Default sort by updated time
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(null); // State to track which task's menu is open
  const navigate = useNavigate(); // Hook for navigation

  const menuRefs = useRef({}); // To track refs for each menu

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        const sortedTasks = sortTasks(response.data, sortType);
        setTasks(sortedTasks);
        setFilteredTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, [sortType]); // Re-run when sortType changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Iterate over each menuRef to check if the click is outside
      Object.keys(menuRefs.current).forEach((taskId) => {
        if (
          menuRefs.current[taskId] &&
          !menuRefs.current[taskId].contains(event.target)
        ) {
          setShowMenu(null); // Close the menu if clicking outside
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortTasks = (tasks, type) => {
    return [...tasks].sort((a, b) => {
      if (type === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (type === "updatedAt") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (type === "taskName") {
        return a.taskName.localeCompare(b.taskName);
      }
      return 0;
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tasks.filter(
      (task) =>
        task.taskName.toLowerCase().includes(value) ||
        task.description.toLowerCase().includes(value)
    );
    setFilteredTasks(sortTasks(filtered, sortType)); // Apply sorting to filtered tasks
  };

  const handleSort = () => {
    const newSortType =
      sortType === "updatedAt"
        ? "createdAt"
        : sortType === "createdAt"
        ? "taskName"
        : "updatedAt";
    setSortType(newSortType);
  };

  const toggleStar = async (taskId) => {
    // Optimistically update the UI before the API call
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, star: !task.star } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(sortTasks(updatedTasks, sortType));

    try {
      // Find the task to be updated
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      const updatedStarStatus = !taskToUpdate.star;

      // Send the update to the backend using the star update route
      await axios.put(`/api/task/star/${taskId}`, { star: updatedStarStatus });

      // If successful, no further action is needed since the UI is already updated optimistically
    } catch (error) {
      console.error("Error updating star status:", error);
      setError("Failed to update star status");

      // Revert the UI change in case of an error
      const revertedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, star: taskToUpdate.star } : task
      );
      setTasks(revertedTasks);
      setFilteredTasks(sortTasks(revertedTasks, sortType));
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be recovered."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/api/task/${taskId}`);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        setFilteredTasks((prevFilteredTasks) =>
          prevFilteredTasks.filter((task) => task._id !== taskId)
        );
        setShowMenu(null); // Close the menu after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
        setError("Failed to delete task");
      }
    }
  };

  const handleShowDetails = (taskId) => {
    navigate(`/task/${taskId}`); // Navigate to task details page
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const roundToNearestMinute = (date) => {
    const roundedDate = new Date(date);
    roundedDate.setSeconds(0, 0); // Reset seconds and milliseconds to 0
    return roundedDate.getTime();
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Scheduled Tasks</h2>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg flex-1 max-w-xs">
          <FaSearch className="ml-3 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for tasks..."
            className="flex-1 px-3 py-2 outline-none bg-transparent"
          />
        </div>
        <button
          onClick={handleSort}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-indigo-600"
        >
          <FaSort className="text-lg" />
          <span className="ml-2">
            {sortType === "updatedAt"
              ? "Updated Time"
              : sortType === "createdAt"
              ? "Created Time"
              : "Task Name"}
          </span>
        </button>
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
                      task.star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                </button>
                <div className="relative">
                  <FaEllipsisV
                    className="text-gray-500 cursor-pointer text-sm"
                    onClick={() =>
                      setShowMenu(showMenu === task._id ? null : task._id)
                    }
                  />
                  {showMenu === task._id && (
                    <div
                      className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2"
                      ref={(el) => (menuRefs.current[task._id] = el)} // Set ref for this task's menu
                    >
                      <button
                        className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100 text-xs"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents event from bubbling up and triggering `handleClickOutside`
                          handleDelete(task._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{task.description}</p>
            <p className="text-gray-500 text-xs mt-2">
              Created: {formatDate(task.createdAt)}
              {roundToNearestMinute(task.createdAt) !==
                roundToNearestMinute(task.updatedAt) && (
                <> | Updated: {formatDate(task.updatedAt)}</>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPreview;
