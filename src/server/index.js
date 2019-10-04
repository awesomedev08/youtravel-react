import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mockAPIResponse from './mockAPI';
import path from 'path';

import {fetchGEOData} from './geo_api';

dotenv.config();

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

app.get('/geoname', (req, res) => {
  const name = req.query.name;
  fetchGEOData(name).then((response) => {
    if (response.success) {
      res.json({success: true, data: response.data});
    } else {
      res.json({success: false, message: response.message});
    }
  });
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
