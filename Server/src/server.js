const express = require('express');
//We are bringing in the express framework and storing it in a constant
const app = express();
//We are initializing the express framework and saving it into another constant.
const PORT = process.env.PORT || 3001;
//We are saving the port of our server into a constant
app.listen(PORT, () => console.log('Server running on port ${PORT}')) 

// Middleware to handle JSON data
app.use(express.json());

// Routes
const fileRoutes = require('./routes/fileRoutes');
app.use('/api', fileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});