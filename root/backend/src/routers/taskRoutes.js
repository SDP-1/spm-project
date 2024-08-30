const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Route to create a new task
router.post("/task/add", async (req, res) => {
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

// Route to get a specific task by ID
router.get("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error fetching task details:", error);
    res.status(500).json({ message: "Failed to fetch task details" });
  }
});

// Route to update a task by ID
router.put("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
    });

    if (updatedTask) {
      res
        .status(200)
        .json({ message: "Task updated successfully!", task: updatedTask });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.put("/task/star/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { star } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { star },
      { new: true } // Return the updated document
    );

    if (updatedTask) {
      res
        .status(200)
        .json({
          message: "Star status updated successfully!",
          task: updatedTask,
        });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating star status:", error);
    res.status(500).json({ message: "Failed to update star status" });
  }
});

// Route to delete a task by ID
router.delete("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      res.status(200).json({ message: "Task deleted successfully!" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
