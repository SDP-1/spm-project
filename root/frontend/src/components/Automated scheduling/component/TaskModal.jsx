import React from "react";
import TaskScheduler from "../pages/TaskScheduler"; // Import your TaskScheduler

const TaskModal = ({ isOpen, onClose, refreshTasks }) => {
  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl h-[80%] overflow-y-auto">
        {/* Modal Header with sticky positioning */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-300">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl p-2"
            style={{ fontSize: "2rem" }} // Adjust font size
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold">Add New Task</h2>
        </div>

        {/* Modal Body */}
        <div className="p-2">
          <TaskScheduler onClose={onClose} refreshTasks={refreshTasks} />{" "}
          {/* Consistent prop name */}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
