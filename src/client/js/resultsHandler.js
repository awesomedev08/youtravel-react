const showResults = (data) => {
  const headerNav = document.getElementById('yt__header_navigation');
  const headerHero = document.getElementById('yt__header_hero');
  const headerForm = document.getElementById('yt__header_form');

  // we hide header hero & header form
  headerHero.style.display = 'none';
  headerForm.style.display = 'none';

  // we set a background color to our header navigation bar
  headerNav.style.background = '#ebc944';

  // we want to store our grid template rows value
  const bodyElement = document.getElementsByTagName('body')[0];
  const cssGridRowsValue = bodyElement.style.gridTemplateRows;

  // we want to make our header shorter now
  bodyElement.style.gridTemplateRows = '70px 1fr 50px';

  const resultSection = document.getElementById('yt__result_section');

  // we show result section
  resultSection.style.visibility = 'visible';

  if (data.geo) {
    const {destination, countryName, countryCode} = data.geo;
    const resultDestination = document.getElementById('yt__results_destination');
    resultDestination.innerHTML = `${destination} - ${countryName}, ${countryCode}`;

    const resultDepartureDate = document.getElementById('yt__results_departure');
    resultDepartureDate.innerHTML = `${data.geo.departureDate}`;

    const resultReturnDate = document.getElementById('yt__results_return');
    resultReturnDate.innerHTML = `${data.geo.returnDate}`;

    const resultDaysUntil = document.getElementById('yt__results_days_until');
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const currentDate = new Date();
    const departureDate = new Date(data.geo.departureDate);
    const untilDays = Math.round(Math.abs((currentDate - departureDate) / oneDay));
    resultDaysUntil.innerHTML = `${untilDays} days`;

    const resultTotalDays = document.getElementById('yt__results_total_days');
    const returnDate = new Date(data.geo.returnDate);
    const totalDays = Math.round(Math.abs((returnDate - departureDate) / oneDay));
    resultTotalDays.innerHTML = `${totalDays} days`;
  }

  if (data.pix && data.pix.total > 0 && data.pix.hits[0]) {
    const pictureElement = document.getElementById('yt__result_picture');
    pictureElement.src = data.pix.hits[0].largeImageURL;
  } else {
    const pictureElement = document.getElementById('yt__result_picture');
    pictureElement.src = 'https://via.placeholder.com/300/09f/fff.png';
  }

  if (data.sky) {
    const {lat, lng} = data.geo;
    const weatherElement = document.getElementById('yt__result_weather');
    weatherElement.src = `https://darksky.net/widget/default/${lat},${lng}/us12/en.js?width=100%&height=350&title=Weather Information&textColor=333333&bgColor=FFFFFF&transparency=false&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes`;
  }

  // We set the event listener for the element with the id of "yt__search_button"
  const backButton = document.getElementById('yt__back_button');
  backButton.addEventListener('click', () => {
    // we hide result section
    resultSection.style.visibility = 'hidden';
    headerForm.style.display = 'none';

    // we show header hero & header form
    headerHero.style.display = 'block';
    headerForm.style.display = 'block';

    // we want to make our header back to it's original values
    document.getElementsByTagName('body')[0].style.gridTemplateRows = cssGridRowsValue;

    // we set a transparent background color to our header navigation bar
    headerNav.style.background = 'transparent';
  });
};

export {showResults};
