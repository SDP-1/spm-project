const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.resolve('E:/SPM/JSON/repository-fab74-firebase-adminsdk-qojz1-7280c2c782.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  storageBucket: 'repository-fab74.appspot.com'
});
const bucket = admin.storage().bucket();

const getApiPathFromUrl = (url) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\.git/);
  if (match) {
    return `https://api.github.com/repos/${match[1]}/${match[2]}/contents`;
  }
  return null;
};

router.get('/repo-files', async (req, res) => {
  const { repoUrl } = req.query;
  const token = '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'; // Replace with your GitHub token

  if (!repoUrl) {
    return res.status(400).json({ message: 'Repository URL is required' });
  }

  const apiUrl = getApiPathFromUrl(repoUrl);

  if (!apiUrl) {
    return res.status(400).json({ message: 'Invalid repository URL' });
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    const files = response.data;
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching repository files:', error);
    res.status(500).json({ message: 'Failed to fetch repository files' });
  }
});

// Route to save files to Firebase Storage
router.post('/save-to-firebase', async (req, res) => {
  const { files, repoName } = req.body; // Array of files and repository name to upload
  const token = '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'; // Replace with your GitHub token

  try {
    // Loop through each file and upload to Firebase Storage
    for (let file of files) {
      const fileResponse = await axios.get(file.url, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3.raw', // Get raw file content
        },
      });

      const buffer = Buffer.from(fileResponse.data, 'utf-8');

      // Upload to Firebase Storage using repository name as part of the path
      const fileUpload = bucket.file(`${repoName}/${file.path}`);
      await fileUpload.save(buffer, {
        metadata: { contentType: file.type },
      });
    }

    res.status(200).json({ message: 'Files successfully saved to Firebase Storage' });
  } catch (error) {
    console.error('Error uploading files to Firebase:', error);
    res.status(500).json({ message: 'Failed to upload files to Firebase' });
  }
});

module.exports = router;
