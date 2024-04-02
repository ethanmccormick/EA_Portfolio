const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pyewacket10!',
  database: 'elliott_andrew_portfolio',
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