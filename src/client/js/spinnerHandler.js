// Function used to set or hide spinner visibility
const toggleSpinner = (flag) => {
  const spinnerElement = document.getElementById('yt__spinner');
  if (flag) {
    spinnerElement.classList.add('yt__visible');
  } else {
    spinnerElement.classList.remove('yt__visible');
  }
};

export {toggleSpinner};
