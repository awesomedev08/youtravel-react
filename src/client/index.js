import {toggleSpinner} from './js/spinnerHandler';
import './styles/index.scss';

const _initServiceWorker = () => {
  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performance
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((registration) => {
        console.log('SW registered: ', registration);
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
};
_initServiceWorker();

// HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document Loaded');
  toggleSpinner(true);

  setTimeout(() => toggleSpinner(false), 3000);
});
