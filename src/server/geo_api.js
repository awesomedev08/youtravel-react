import request from 'request';

/**
 * Function that calls GeoNames Search Webservice to resolve a location name
 *
 * @param {String} dest - Destination name for which we want GEO data.
 * @return {JSON} representing current weather info specific to our zip code.
 */
const fetchGEOData = async (dest) => {
  // we build our data necessary for doing the fetch operation from GeoNames api
  const url = `http://api.geonames.org/searchJSON?q=${dest}&maxRows=1&username=${process.env.GEO_USERNAME}`;

  return new Promise((resolve, reject) => {
    request(url, {json: true}, (err, res, data) => {
      if (err) {
        reject(new Error({
          success: false,
          message: 'There was a GEO server error.',
        }));
      } else {
        if (data && data.geonames && data.geonames[0]) {
          const {lat, lng} = data.geonames[0];
          resolve({
            success: true,
            data: {lat, lng},
          });
        } else {
          resolve({
            success: false,
            message: 'There was a GEO destination error.',
          });
        }
      }
    });
  });
};

export {fetchGEOData};
