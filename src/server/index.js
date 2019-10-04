import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mockAPIResponse from './mockAPI';
import path from 'path';

import {fetchDarkSkyData} from './dark_sky_api';
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
  fetchGEOData(name).then((geoResponse) => {
    if (geoResponse.success) {
      const {lat, lng} = geoResponse.data;
      const date = new Date().getTime();
      fetchDarkSkyData(date, lat, lng).then((skyResponse) => {
        if (skyResponse.success) {
          res.json({
            success: true,
            data: {
              geo: geoResponse.data,
              sky: skyResponse.data,
            },
          });
        } else {
          res.json({
            success: false,
            data: {
              geo: geoResponse.data,
              sky: skyResponse.message,
            },
          });
        }
      });
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
