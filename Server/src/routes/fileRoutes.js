const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js');
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

// Route image file
router.post('/upload/image', (req, res) => {
  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Extract file data from req.file
    const fileData = req.file.buffer;
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    try {
      // Insert file data into database
      await pool.query('INSERT INTO files (file_name, file_type, file_data) VALUES ($1, $2, $3)', [fileName, fileType, fileData]);

      // File upload successful
      return res.json({ message: 'Image file uploaded successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Route text file
router.post('/upload/text', (req, res) => {
  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const fileData = req.file.buffer;
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    try {
      await pool.query('INSERT INTO files (file_name, file_type, file_data) VALUES ($1, $2, $3)', [fileName, fileType, fileData]);
      return res.json({ message: 'Text file uploaded successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Route for uploading a video file
router.post('/upload/video', (req, res) => {
  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const fileData = req.file.buffer;
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    try {
      await pool.query('INSERT INTO files (file_name, file_type, file_data) VALUES ($1, $2, $3)', [fileName, fileType, fileData]);
      return res.json({ message: 'Video file uploaded successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});


module.exports = router;