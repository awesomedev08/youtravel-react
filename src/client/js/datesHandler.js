import flatPicker from 'flatpickr';

let departureDate;
let returnDate;
let datesError;
let departureDateElement;
let departureIconElement;
let returnDateElement;
let returnIconElement;

const _checkDatesError = () => {
  // we check if there is an error in case return date is older then departure date
  if (returnDate && returnDate.getTime() <= departureDate.getTime()) {
    // we are not supporting time travellers
    datesError.style.visibility = 'visible';
    datesError.innerHTML = 'Return date should be after Departure date.';
  } else {
    datesError.style.display = 'hidden';
    datesError.innerHTML = '';
  }
};

const initializeDatePickers = () => {
  datesError = document.getElementById('yt__dates_error');
  departureDateElement = document.getElementById('yt__departure_label');
  departureIconElement = document.getElementById('yt__departure_icon');
  returnDateElement = document.getElementById('yt__return_label');
  returnIconElement = document.getElementById('yt__return_icon');

  // we set cursor style for Return date to default util Departure date is done
  returnDateElement.style.cursor = 'default';

  flatPicker('#yt__departure_label', {
    minDate: new Date(),
    onChange: (selectedDates, dateStr, instance) => {
      departureDateElement.innerHTML = dateStr;
      departureDateElement.style.opacity = '1';
      departureIconElement.style.opacity = '1';

      // we set a new listener for Return date only after Departure date is done
      returnDateElement.style.cursor = 'pointer';

      // we store departure date
      departureDate = new Date(dateStr);

      flatPicker('#yt__return_label', {
        minDate: new Date().setDate(departureDate.getDate() + 1),
        onChange: (selectedDates, dateStr, instance) => {
          returnDateElement.innerHTML = dateStr;
          returnDateElement.style.opacity = '1';
          returnIconElement.style.opacity = '1';

          // we store return date
          returnDate = new Date(dateStr);

          // check if there are errors
          _checkDatesError();
        },
      });

      // check if there are errors
      _checkDatesError();
    },
  });
};

export {initializeDatePickers};
