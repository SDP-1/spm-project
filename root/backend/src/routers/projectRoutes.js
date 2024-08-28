// routers/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // Adjust path if necessary

// Route to create a new project
router.post('/', async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = new Project(projectData);
    await newProject.save();
    res.status(200).json({ message: 'Project created successfully!' });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

// Route to fetch all projects (optional, if needed)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

module.exports = router;
