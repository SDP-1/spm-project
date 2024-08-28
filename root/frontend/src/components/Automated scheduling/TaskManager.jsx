import React, { useState } from "react";
import TaskScheduler from "./pages/TaskScheduler";
import TaskPreview from "./pages/TaskPreview";

const TaskManager = () => {
  const [scheduledTasks, setScheduledTasks] = useState([]);

  const handleScheduleTask = (task) => {
    setScheduledTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = (index) => {
    setScheduledTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <TaskScheduler />
      <TaskPreview/>
    </div>
  );
};

export default TaskManager;
