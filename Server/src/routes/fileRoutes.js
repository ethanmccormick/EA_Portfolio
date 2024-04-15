const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js');
const AWS = require('aws-sdk');

//referencing https://saturncloud.io/blog/how-to-upload-a-file-to-amazon-s3-with-nodejs/

AWS.config.update({
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  
  region: 'us-east-2' 
});

const s3 = new AWS.S3();

const singleUpload = upload.single('file');

router.post('/upload', (req, res) => {
  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Here is my upload logic.
    let folder;
    let allowedTypes;
    switch (req.file.mimetype) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/svg+xml':
        folder = 'image-files/';
        allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
        break;
      case 'application/pdf': 
        folder = 'text-files/';
        allowedTypes = ['application/pdf'];
        break;
      case 'video/mp4':
        folder = 'video-files/';
        allowedTypes = ['video/mp4'];
        break;
      default:
        return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Check if the file type is allowed for the detected folder
    if (!allowedTypes.includes(req.file.mimetype)) {
      if (folder === 'text-files/') {
        return res.status(400).json({ error: 'Only PDF files are allowed for text files' });
      } else {
        return res.status(400).json({ error: 'Only JPEG, PNG, GIF, and SVG files are allowed for images' });
      }
    }

    // Here I create the parameters for each thing
    const params = {
      Bucket: 'ea-portfolio-files',
      Key: folder + req.file.originalname, 
      Body: req.file.buffer 
    };

    try {
      await s3.upload(params).promise();
      return res.json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});
module.exports = router;