import React from "react";
import { FaChevronDown } from "react-icons/fa";

const TaskForm = ({
  taskName,
  setTaskName,
  description,
  setDescription,
  projects,
  projectId,
  setProject,
  disable,
}) => (
  <>
    <div className="mb-4">
      <label
        className="block text-gray-800 text-sm font-semibold mb-2"
        htmlFor="taskName"
      >
        Task Name
      </label>
      <input
        type="text"
        id="taskName"
        className={`shadow border rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disable
            ? "opacity-50 bg-gray-200 text-gray-700"
            : "bg-gray-100 text-black"
        }`}
        value={taskName}
        onChange={(e) => !disable && setTaskName(e.target.value)}
        disabled={disable}
        placeholder="Enter task name"
      />
    </div>

    <div className="mb-4">
      <label
        className="block text-gray-800 text-sm font-semibold mb-2"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        id="description"
        className={`shadow border rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disable
            ? "opacity-50 bg-gray-200 text-gray-700"
            : "bg-gray-100 text-black"
        }`}
        rows="4"
        value={description}
        onChange={(e) => !disable && setDescription(e.target.value)}
        disabled={disable}
        placeholder="Enter task description"
      />
    </div>

    <div className="mb-4 relative">
      <label
        className="block text-gray-800 text-sm font-semibold mb-2"
        htmlFor="projectDropdown"
      >
        Select Project
      </label>
      <select
        id="projectDropdown"
        value={projectId}
        onChange={(e) => !disable && setProject(e.target.value)}
        className={`shadow border rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
          disable
            ? "opacity-50 bg-gray-200 text-gray-700"
            : "bg-gray-100 text-black"
        }`}
        disabled={disable}
      >
        <option value="">Select a project</option>
        {projects.map((item) => (
          <option key={item._id} value={item._id}>
            {item.projectName}
          </option>
        ))}
      </select>
    </div>
  </>
);

export default TaskForm;
