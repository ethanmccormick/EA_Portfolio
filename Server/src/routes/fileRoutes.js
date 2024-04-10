const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'US East (Ohio) us-east-2' // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

const singleUpload = upload.single('file');