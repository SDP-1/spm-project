const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Route to create a new task
router.post("/tasks", async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = new Task(taskData);
    await newTask.save();
    res.status(200).json({ message: "Task scheduled successfully!" });
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ message: "Failed to schedule task" });
  }
});

// Route to fetch all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

module.exports = router;
