const express = require('express');
const router = express.Router();
const axios = require('axios');

const getApiPathFromUrl = (url) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\.git/);
  if (match) {
    return `https://api.github.com/repos/${match[1]}/${match[2]}/contents`;
  }
  return null;
};

router.get('/repo-files', async (req, res) => {
  const { repoUrl } = req.query;
  const token = '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'; // Add your GitHub token here

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

module.exports = router;
