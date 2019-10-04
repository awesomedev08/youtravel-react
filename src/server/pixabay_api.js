import request from 'request';

/**
 * Function that calls PixaBay API to get picture data.
 *
 * @param {String} dest - Destination information for which we want a picture data.
 * @return {JSON} representing picture data specific to our destination location.
 */
const fetchPixaBayData = async (dest) => {
  // PixaBay base url
  const baseURL = `https://pixabay.com/api?key=${process.env.PIXABAY_KEY}&q=${dest}&image_type=photo&category=places`;

  // PixaBay number of results per page
  const itemsCount = `&per_page=3`;

  // we construct PixaBay URL
  const url = `${baseURL}${itemsCount}&pretty=true`;

  return new Promise((resolve, reject) => {
    request(url, {json: true}, (err, res, data) => {
      if (err) {
        reject(new Error({
          success: false,
          message: 'There was a Pixabay server error.',
        }));
      } else {
        if (data) {
          resolve({
            success: true,
            data: data,
          });
        } else {
          resolve({
            success: false,
            message: 'There was a Pixabay data error.',
          });
        }
      }
    });
  });
};

export {fetchPixaBayData};
