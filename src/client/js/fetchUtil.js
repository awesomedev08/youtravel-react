/**
 * Helper function that helps us making GET calls to the server.
 *
 * @param {String} path - Path for server endpoint that we want to call.
 * @param {Object} data - Data that we want to send
 */
const getData = async (path) => {
  return await fetch(path, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  });
};

/**
 * Helper function that helps us making POST calls to the server.
 *
 * @param {String} path - Path for server endpoint that we want to call.
 * @param {Object} data - Data that we want to send
 */
const postData = async (path, data = {}) => {
  return await fetch(path, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
};

export {getData, postData};
