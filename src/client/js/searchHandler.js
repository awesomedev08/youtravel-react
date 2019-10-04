import {getData} from './fetchUtil';
import {showResults} from './resultsHandler';
import {toggleSpinner} from './spinnerHandler';

// our base url to server endpoints url's
const baseURL = 'http://localhost:3000';

// function used to handle search of an adventure
const _searchAdventure = async (name, dDate, rDate) => {
  // we show the spinner until we finish the calls
  toggleSpinner(true);

  return new Promise((resolve, reject) => {
    const url = `${baseURL}/search?dest=${name}&dDate=${dDate}&rDate=${rDate}`;
    getData(url).then((response) => {
      if (response.status !== 200) {
        reject(new Error({
          success: false,
          message: 'There was a server error.',
        }));
      }

      response.json().then((resData) => {
        if (resData.success) {
          resolve({
            success: true,
            data: resData.data,
          });
        } else {
          resolve({
            success: false,
            data: resData.data,
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
  const departureElement = document.getElementById('yt__departure_label');
  const returnElement = document.getElementById('yt__return_label');
  const errorElement = document.getElementById('yt__dates_error');

  const destination = destinationElement.value ? destinationElement.value.trim() : null;
  const departureDate = departureElement.value ? departureElement.value.trim() : null;
  const returnDate = returnElement.value ? returnElement.value.trim() : null;

  let hasErrors = false;
  let errorMessage = '';

  // we check if we have a return date
  if (returnDate === null) {
    hasErrors = true;
    errorMessage = 'Return date is required.';
  }

  // we check if we have a departure date
  if (departureDate === null) {
    hasErrors = true;
    errorMessage = 'Departure date is required.';
  }

  // we check if we have a destination
  if (destination === null) {
    hasErrors = true;
    errorMessage = 'Destination name is required.';
  }

  if (!hasErrors) {
    // we remove errors in case they were
    errorElement.style.visibility = 'hidden';
    errorElement.innerHTML = '';

    _searchAdventure(destination, departureDate, returnDate).then((response) => {
      if (response.success) {
        showResults(response.data);
        console.log(response);
      } else {
        console.log(response.message);
      }

      // we hide the spinner because we have a response
      toggleSpinner(false);
    });
  } else {
    // we show errors to the user
    errorElement.style.visibility = 'visible';
    errorElement.innerHTML = errorMessage;
  }
});
