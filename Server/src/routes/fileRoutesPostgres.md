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

// Route upload image file
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
      // Insert file data into database using pool.query which lets us write a postgresSQL query in our code here
      await pool.query('INSERT INTO files (file_name, file_type, file_data) VALUES ($1, $2, $3)', [fileName, fileType, fileData]);

      // File upload successful
      return res.json({ message: 'Image file uploaded successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Route upload text file
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


// Route upload video file
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

// Route fetching
router.get('/documents', async (req, res) => {
  try {
    // Get documents from the database using the pool.query function
    const queryResult = await pool.query('SELECT * FROM files');

    // Extract relevant data from the query result
    const documents = queryResult.rows.map(row => ({
      id: row.id,
      fileName: row.file_name,
      fileType: row.file_type,
      fileData:row.file_data
    }));

    // Send the documents as a JSON response
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;