// models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDetails: { type: String, required: true },
  access: { type: String, enum: ['Public', 'Private'], required: true },
  authorName: { type: String, required: true },
  repositoryName: { type: String, required: true }, // Changed from authorEmail to repositoryName
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
