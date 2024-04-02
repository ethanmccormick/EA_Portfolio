const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ea-portfolio',
  password: 'Pyewacket',
  port: 5432,
});


// Middleware for handling file uploads
const singleUpload = upload.single('file');

// Route for uploading an image file
router.post('/upload/image', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // File upload successful
    return res.json({ message: 'Image file uploaded successfully' });
  });
});

// Route for uploading a text file
router.post('/upload/text', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // File upload successful
    return res.json({ message: 'Text file uploaded successfully' });
  });
});

// Route for uploading a video file
router.post('/upload/video', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // File upload successful
    return res.json({ message: 'Video file uploaded successfully' });
  });
});

module.exports = router;