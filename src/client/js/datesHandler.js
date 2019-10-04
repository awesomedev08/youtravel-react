import flatPicker from 'flatpickr';

let departureDateElement;
let departureIconElement;
let returnDateElement;
let returnIconElement;

const initializeDatePickers = () => {
  departureDateElement = document.getElementById('yt__departure_label');
  departureIconElement = document.getElementById('yt__departure_icon');
  returnDateElement = document.getElementById('yt__return_label');
  returnIconElement = document.getElementById('yt__return_icon');

  // we set cursor style for Return date to default util Departure date is done
  returnDateElement.style.cursor = 'default';

  flatPicker('#yt__departure_label', {
    onChange: (selectedDates, dateStr, instance) => {
      departureDateElement.innerHTML = dateStr;
      departureDateElement.style.opacity = '1';
      departureIconElement.style.opacity = '1';

      // we set a new listener for Return date only after Departure date is done
      returnDateElement.style.cursor = 'pointer';
      flatPicker('#yt__return_label', {
        onChange: (selectedDates, dateStr, instance) => {
          returnDateElement.innerHTML = dateStr;
          returnDateElement.style.opacity = '1';
          returnIconElement.style.opacity = '1';
        },
      });
    },
  });
};

export {initializeDatePickers};
