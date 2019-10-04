import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mockAPIResponse from './mockAPI';
import path from 'path';

import {fetchDarkSkyData} from './dark_sky_api';
import {fetchGEOData} from './geo_api';
import {fetchPixaBayData} from './pixabay_api';

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

app.get('/search', (req, res) => {
  const {dDate, dest} = req.query;

  fetchGEOData(dest).then((geoResponse) => {
    if (geoResponse.success) {
      const {lat, lng} = geoResponse.data;
      const date = new Date(dDate).getTime();
      fetchDarkSkyData(date, lat, lng).then((skyResponse) => {
        if (skyResponse.success) {
          fetchPixaBayData(dest).then((pixResponse) => {
            if (pixResponse.success) {
              res.json({
                success: true,
                data: {
                  geo: geoResponse.data,
                  sky: skyResponse.data,
                  pix: pixResponse.data,
                },
              });
            } else {
              res.json({
                success: false,
                data: {
                  geo: geoResponse.data,
                  sky: skyResponse.message,
                  pix: null,
                },
              });
            }
          });
        } else {
          res.json({
            success: false,
            data: {
              geo: geoResponse.data,
              sky: null,
              pix: null,
            },
          });
        }
      });
    } else {
      res.json({
        success: false,
        data: {
          geo: null,
          sky: null,
          pix: null,
        },
      });
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
