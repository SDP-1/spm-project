// TaskForm.jsx

import React from "react";
import { FaChevronDown } from "react-icons/fa"; // Import the dropdown icon

const TaskForm = ({
  taskName,
  setTaskName,
  description,
  setDescription,
  repositoris,
  repository,
  setRepository,
  disable,
}) => (
  <>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="taskName"
      >
        Task Name
      </label>
      <input
        type="text"
        id="taskName"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={taskName}
        onChange={(e) => !disable && setTaskName(e.target.value)}
        disabled={disable}
      />
    </div>

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        id="description"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows="4"
        value={description}
        onChange={(e) => !disable && setDescription(e.target.value)}
        disabled={disable}
      />
    </div>

    <div className="mb-4 relative">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="dropdown"
      >
        Select Repository
      </label>
      <select
        id="dropdown"
        value={repository}
        onChange={(e) => !disable && setRepository(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
        disabled={disable}
      >
        <option value="">Select repository</option>
        {repositoris.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      
    </div>
  </>
);

export default TaskForm;
