import request from 'request';

// utility function that calculates epoch/unix time from a date.
const _getEpochTime = (date) => {
  return Math.round(date.getTime() / 1000);
};

/**
 * Private function that determinate if we need a current forecast or a future one.
 *
 * @param {String} date - Departure date based on which we would decide forecast type.
 * @return {String} representing forecast type calculated based on our departure date.
 */
const _getForecastType = (date) => {
  const currentDate = _getEpochTime(new Date());
  const epochTime = _getEpochTime(new Date(date));

  // we check to see if departure date is in current week period or not
  return (epochTime - currentDate > 7 * 24 * 60 * 60 * 1000) ? 'expected' : 'current';
};

/**
 * Function that calls Dark Sky API to get weather information.
 *
 * @param {Number} date - Date for which we want to find a forecast represented as number.
 * @param {Number} lat - Latitude for location that we want the forecast.
 * @param {Number} lng - Longitude for location that we want the forecast.
 * @return {JSON} representing forecast data specific to our geo location.
 */
const fetchDarkSkyData = async (date, lat, lng) => {
  // we check what kind of forecast do we want
  const forecatsType = _getForecastType(date);
  // Dark Sky base url
  const baseURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}`;

  if ('current' === forecatsType) {
    const url = `${baseURL}/${lat},${lng}`;
    return new Promise((resolve, reject) => {
      request(url, {json: true}, (err, res, data) => {
        if (err) {
          reject(new Error({
            success: false,
            message: 'There was a Dark Sky server error.',
          }));
        } else {
          console.log(JSON.stringify(data));
          if (data) {
            resolve({
              success: true,
              data: data,
            });
          } else {
            resolve({
              success: false,
              message: 'There was a Dark Sky forecast error.',
            });
          }
        }
      });
    });
  } else {
    const url = `${baseURL}/${lat},${lng},${_getEpochTime(new Date(date))}`;
    return new Promise((resolve, reject) => {
      request(url, {json: true}, (err, res, data) => {
        if (err) {
          reject(new Error({
            success: false,
            message: 'There was a Dark Sky server error.',
          }));
        } else {
          console.log(JSON.stringify(data));
          if (data) {
            resolve({
              success: true,
              data: {...data},
            });
          } else {
            resolve({
              success: false,
              message: 'There was a Dark Sky forecast error.',
            });
          }
        }
      });
    });
  }
};

export {fetchDarkSkyData};
