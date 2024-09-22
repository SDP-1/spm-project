const express = require("express");
const router = express.Router();
const axios = require("axios");
const admin = require("firebase-admin");
const path = require("path");
const Project = require("../models/project"); // Import the MongoDB model

// Initialize Firebase Admin (Firestore and Storage)
const serviceAccountPath = path.resolve(
  "E:/SPM/JSON/repository-fab74-firebase-adminsdk-qojz1-7280c2c782.json"
);

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  storageBucket: "repository-fab74.appspot.com",
});

const bucket = admin.storage().bucket();

// Utility function to convert GitHub URL to API URL
const getApiPathFromUrl = (url) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\.git/);
  if (match) {
    return `https://api.github.com/repos/${match[1]}/${match[2]}/contents`;
  }
  return null;
};

// Fetch repository files from GitHub
router.get("/repo-files", async (req, res) => {
  const { repoUrl } = req.query;
  const token = "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"; // Replace with your GitHub token

  if (!repoUrl) {
    return res.status(400).json({ message: "Repository URL is required" });
  }

  const apiUrl = getApiPathFromUrl(repoUrl);

  if (!apiUrl) {
    return res.status(400).json({ message: "Invalid repository URL" });
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    const files = response.data;
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching repository files:", error);
    res.status(500).json({ message: "Failed to fetch repository files" });
  }
});

// Route to save files to Firebase Storage and update MongoDB with folder URL
router.post("/save-to-firebase", async (req, res) => {
  const { files, repoName, projectId } = req.body;
  const token = "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"; // Replace with your GitHub token

  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  console.log("print text 1");

  try {
    // Loop through each file and upload to Firebase Storage
    for (let file of files) {
      // Check if file has a valid download_url
      if (!file.download_url) {
        console.error(`Invalid or missing download_url for file: ${file.path}`);
        continue; // Skip this file
      }

      // Log the URL being requested
      console.log(`Fetching file from URL: ${file.download_url}`);

      // Download file content from GitHub using arraybuffer response type
      const fileResponse = await axios.get(file.download_url, {
        headers: {
          Authorization: `token ${token}`,
        },
        responseType: "arraybuffer", // Ensure raw data is fetched
      });

      console.log("print text 2");

      // Convert the raw data into a buffer
      const buffer = Buffer.from(fileResponse.data);

      // Upload to Firebase Storage using repository name as part of the path
      const fileUpload = bucket.file(`${repoName}/${file.path}`);
      await fileUpload.save(buffer, {
        metadata: { contentType: file.type }, // Ensure the contentType is set appropriately
      });
    }

    console.log("print text 3");

    // Construct the folder URL for the repository in Firebase Storage
    const folderUrl = `https://storage.googleapis.com/${bucket.name}/${repoName}/`;

    // Log repoName and folderUrl
    console.log(`Updating MongoDB for repo: ${repoName}, URL: ${folderUrl}`);

    // Find and update the relevant project in MongoDB
    const project = await Project.findByIdAndUpdate(
      projectId, // Find by projectId
      { repositoryUrl: folderUrl }, // Update the repository URL
      { new: true } // Return the updated document
    );

    if (project) {
      console.log("MongoDB update success", project); // Log the updated project

      res.status(200).json({
        message:
          "Files successfully saved to Firebase Storage and repositoryUrl updated",
        folderUrl,
      });
    } else {
      console.log(`Project with ID: ${projectId} not found in MongoDB`);
      res.status(404).json({ message: "Project not found in MongoDB" });
    }
  } catch (error) {
    console.error("Error uploading files or updating MongoDB:", error);
    res.status(500).json({
      message: "Failed to upload files to Firebase or update MongoDB",
    });
  }
});

module.exports = router;
