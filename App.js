// src/app.js
const express = require('express');
const app = express();
const routes = require('./src/routes'); 
const cors = require('cors'); // Import the cors package
require('dotenv').config(); // Load environment variables from .env file

// Enable CORS for all routes
app.use(cors()); // This allows all CORS requests

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});