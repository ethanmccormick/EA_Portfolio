const multer = require('multer');

// Set up multer storage and file upload options
//this uses memory storage for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

module.exports = upload;