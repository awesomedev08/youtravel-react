import {getData} from './fetchUtil';
import {toggleSpinner} from './spinnerHandler';

// our base url to server endpoints url's
const baseURL = 'http://localhost:3000';

// Method used to handle search of an adventure
const _searchAdventure = async (name) => {
  // we show the spinner until we finish the calls
  toggleSpinner(true);

  return new Promise((resolve, reject) => {
    getData(`${baseURL}/geoname?name=${name}`).then((response) => {
      if (response.status !== 200) {
        reject(new Error({
          success: false,
          message: 'There was a server error.',
        }));
      }

      response.json().then((data) => {
        if (data.success) {
          resolve({
            success: true,
            data: data,
          });
        } else {
          resolve({
            success: false,
            data: data,
          });
        }
      });
    }).catch((error) => {
      reject(new Error({
        success: false,
        message: error,
      }));
    });
  });
};

// We set the event listener for the element with the id of "yt__search_button"
const searchButton = document.getElementById('yt__search_button');
searchButton.addEventListener('click', () => {
  const destinationElement = document.getElementById('yt__search_input');
  // const departureElement = document.getElementById('yt__departure_label');
  // const returnElement = document.getElementById('yt__return_label');

  const destination = destinationElement.value ? destinationElement.value.trim() : null;

  if (destination === null) {
    window.alert('A location entry is required in order to perform search operation');
  } else {
    _searchAdventure(destination).then((response) => {
      if (response.success) {
        console.log(response);
      } else {
        console.log(response.message);
      }

      // we hide the spinner because we have a response
      toggleSpinner(false);
    });
  }
});
