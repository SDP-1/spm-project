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

// Route to fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

// Route to delete a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // This matches with _id in MongoDB
    console.log(`Deleting project with ID: ${id}`);
    const result = await Project.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully!' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

module.exports = router;