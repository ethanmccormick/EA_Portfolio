const express = require('express');
//We are bringing in the express framework and storing it in a constant 
const app = express();
//We are initializing the express framework and saving it into another constant app.
const PORT = process.env.PORT || 3001;
//We are saving the port of our server into a constant

// Middleware to handle JSON data
app.use(express.json());

// below importes the file routes we defined in fileRoutes.js
const fileRoutes = require('./routes/fileRoutes');
//This defines the fileRoutes file as an API for assigning files
app.use('/api', fileRoutes);

// Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});