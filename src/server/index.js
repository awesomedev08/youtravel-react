require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

// Start up an instance of app
const app = express();

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('./dist'));

// Initialize all routes
app.get('/test', (req, res) => {
  // number of spaces for indentation
  app.set('json spaces', 2);
  res.json(mockAPIResponse);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// Port the app will listen to for incoming requests
const port = 3000;

// Spin up the server
app.listen(port, () => {
  // Callback to debug
  console.log(`Server listening on port: ${port}`);
});
