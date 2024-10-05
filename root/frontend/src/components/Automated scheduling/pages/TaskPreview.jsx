import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaStar, FaEllipsisV, FaSearch, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TaskModal from "../component/TaskModal";
import TaskDetailModal from "./TaskDetailModal";

const TaskPreview = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("updatedAt");
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(null); // Tracks which task's menu is open
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const menuRefs = useRef({});

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State to control TaskDetailModal visibility
  const [taskToPrint, setTaskToPrint] = useState(null); // Track the task to print
  const [taskToDelete, setTaskToDelete] = useState(null); // State to track the task to delete

  // Fetch and sort tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        const sortedTasks = sortTasks(response.data, sortType);
        setTasks(sortedTasks);
        setFilteredTasks(sortedTasks);
      } catch (error) {
        setError("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, [sortType]);

  // Hide menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(menuRefs.current).forEach((taskId) => {
        if (
          menuRefs.current[taskId] &&
          !menuRefs.current[taskId].contains(event.target)
        ) {
          setShowMenu(null);
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sorting tasks
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

  // Search function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tasks.filter(
      (task) =>
        task.taskName.toLowerCase().includes(value) ||
        task.description.toLowerCase().includes(value)
    );
    setFilteredTasks(sortTasks(filtered, sortType));
  };

  // Handle showing task details for printing
  const handleShowDetailsPrintModel = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      setTaskToPrint(task); // Set the task to be printed
      setIsDetailModalOpen(true); // Open the TaskDetailModal
    }
  };

  // Sort toggle
  const handleSort = () => {
    const newSortType =
      sortType === "updatedAt"
        ? "createdAt"
        : sortType === "createdAt"
        ? "taskName"
        : "updatedAt";
    setSortType(newSortType);
  };

  // Star toggle
  const toggleStar = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, star: !task.star } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(sortTasks(updatedTasks, sortType));

    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      const updatedStarStatus = !taskToUpdate.star;

      await axios.put(`/api/task/star/${taskId}`, { star: updatedStarStatus });
    } catch (error) {
      setError("Failed to update star status");
      const revertedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, star: taskToUpdate.star } : task
      );
      setTasks(revertedTasks);
      setFilteredTasks(sortTasks(revertedTasks, sortType));
    }
  };

  // Handle task deletion
  const handleDelete = async () => {
    if (taskToDelete) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task? This action cannot be recovered."
      );

      if (confirmDelete) {
        try {
          await axios.delete(`/api/task/${taskToDelete}`);
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== taskToDelete)
          );
          setFilteredTasks((prevFilteredTasks) =>
            prevFilteredTasks.filter((task) => task._id !== taskToDelete)
          );
          setShowMenu(null); // Close menu after delete
        } catch (error) {
          setError("Failed to delete task");
        }
      }

      // Reset taskToDelete after operation
      setTaskToDelete(null);
    }
  };

  // Navigate to task details
  const handleShowDetails = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  // Format date
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

  // Refresh tasks
  const refreshTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      const sortedTasks = sortTasks(response.data, sortType);
      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks);
    } catch (error) {
      setError("Failed to refresh tasks.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#4F46E5]">Scheduled Tasks</h2>
        <button
          onClick={() => setIsModalOpen(true)} // Ensure modal opens
          className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#6f66ea] transition-all duration-300"
        >
          + Add New Task
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center mb-6 space-x-4">
        <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md w-full max-w-sm">
          <FaSearch className="ml-3 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search tasks..."
            className="flex-1 px-3 py-2 outline-none bg-transparent rounded-full"
          />
        </div>
        <button
          onClick={handleSort}
          className="bg-white px-4 py-2 border border-gray-300 rounded-full shadow-md flex items-center space-x-2 text-gray-600 hover:bg-gray-100"
        >
          <FaSort className="text-lg" />
          <span>
            {sortType === "updatedAt"
              ? "Sort by Updated Time"
              : sortType === "createdAt"
              ? "Sort by Created Time"
              : "Sort by Task Name"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onDoubleClick={() => handleShowDetails(task._id)} // Navigate on double-click
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {task.taskName}
              </h3>
              <div
                className="flex items-center space-x-4 relative"
                onClick={(e) => e.stopPropagation()} // Prevent card double-click when interacting with icons
              >
                <button onClick={() => toggleStar(task._id)}>
                  <FaStar
                    className={`text-xl ${
                      task.star ? "text-yellow-500" : "text-gray-300"
                    } hover:scale-110 transition-transform duration-200`}
                  />
                </button>
                <FaEllipsisV
                  className="text-gray-500 cursor-pointer text-sm"
                  onClick={() =>
                    setShowMenu(showMenu === task._id ? null : task._id)
                  }
                />
                {showMenu === task._id && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2"
                    ref={(el) => (menuRefs.current[task._id] = el)}
                  >
                    <button
                      className="w-full text-left px-4 py-1 text-blue-600 hover:bg-gray-100 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowDetailsPrintModel(task._id); // Open modal for printing
                      }}
                    >
                      Print Details
                    </button>
                    <button
                      className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100 text-xs"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event bubbling
                        setTaskToDelete(task._id); // Set the task to delete
                        handleDelete(); // Now call handleDelete
                      }}
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-xs text-gray-400 mt-4">
              Created: {formatDate(task.createdAt)}
              {task.updatedAt !== task.createdAt && (
                <> | Updated: {formatDate(task.updatedAt)}</>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Fixed "Add New Task" Button */}
      <button
        onClick={() => setIsModalOpen(true)} // Ensure modal opens
        className="fixed bottom-4 right-4 bg-[#4F46E5] text-white rounded-full p-4 shadow-lg hover:bg-[#6f66ea] transition-all duration-300 z-10"
      >
        + Add Task
      </button>

      {/* Modal for printing task details */}
      {isDetailModalOpen && taskToPrint && (
        <TaskDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          task={taskToPrint}
        />
      )}

      {/* Modal for adding new task */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen} // Control visibility of modal
          onClose={() => setIsModalOpen(false)} // Close modal function
          refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
};

export default TaskPreview;
