const cron = require("node-cron");
const Task = require("../models/task"); // Assuming you have your task model here

// Object to keep track of scheduled tasks
const scheduledTasks = {};

// Function to execute a task
const executeTask = async (task) => {
  try {
    console.log(`Executing task: ${task.taskName} (ID: ${task._id})`);
    // Implement your task logic here
    await Task.findByIdAndUpdate(task._id, { executedAt: new Date() });
    console.log(`Task ${task.taskName} executed successfully.`);
  } catch (error) {
    console.error(`Error executing task ${task.taskName}:`, error);
  }
};

// Function to clear an existing scheduled task
const clearScheduledTask = (taskId) => {
  if (scheduledTasks[taskId]) {
    scheduledTasks[taskId].stop(); // Stop the cron job
    delete scheduledTasks[taskId]; // Remove it from the tracking object
    console.log(`Cleared scheduled task: ${taskId}`);
  }
};

// Function to schedule a task
const scheduleTask = (task) => {
  clearScheduledTask(task._id); // Clear existing task if any

  let cronJob; // Variable to hold the cron job

  if (task.frequencyType === "Daily") {
    cronJob = cron.schedule("0 0 * * *", () => {
      executeTask(task);
    });
  } else if (task.frequencyType === "Hourly") {
    const interval = task.frequencyValue || 1;
    cronJob = cron.schedule(`0 */${interval} * * *`, () => {
      executeTask(task);
    });
    //for Every Minute for testing

    // cronJob = cron.schedule("* * * * *", () => {
    //   executeTask(task);
    // });
  } else if (task.frequencyType === "SpecificTime") {
    const [hour, minute] = task.SpecificTime.split(":").map(Number);
    cronJob = cron.schedule(`${minute} ${hour} * * *`, () => {
      executeTask(task);
    });
  }

  if (cronJob) {
    scheduledTasks[task._id] = cronJob; // Add to the tracking object
    console.log(`Scheduled task: ${task.taskName} (ID: ${task._id})`);
  }
};

// Function to schedule and execute recurring tasks based on frequency
const scheduleRecurringTasks = async () => {
  try {
    const tasks = await Task.find({ recurring: true });

    tasks.forEach((task) => {
      scheduleTask(task); // Schedule each task
    });
  } catch (error) {
    console.error("Error scheduling tasks:", error);
  }
};

// Run the scheduler when the server starts
const startTaskAutomation = () => {
  console.log("Starting automated task scheduling...");

  // Schedule recurring tasks on server start
  scheduleRecurringTasks();

  // Refresh recurring tasks every midnight to ensure new tasks are picked up
  cron.schedule("0 0 * * *", () => {
    console.log("Refreshing recurring tasks...");
    scheduleRecurringTasks();
  });
};

// Export the function to start the automation
module.exports = { startTaskAutomation, scheduleTask, clearScheduledTask };
