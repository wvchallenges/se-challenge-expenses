import { API_BASE_URL } from 'constants';

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  return response.json().then(err => {
    const error = new Error(response.statusText);
    error.response = err || {};
    throw error;
  });
}

function fetcher(endpoint, config) {
  const options = config || defaultOptions;
  return fetch(`${ API_BASE_URL }${ endpoint }`, options).then(checkStatus)
}

export function get(endpoint) {
  const config = { method: 'GET' };
  return fetcher(endpoint, config);
}

export function post(endpoint, body = {}) {
  const config = { method: 'POST', body: JSON.stringify(body) };
  return fetcher(endpoint, config);
}

export function put(endpoint, body = {}) {
  const config = { method: 'PUT', body: JSON.stringify(body) };
  return fetcher(endpoint, config);
}

export function destroy(endpoint) {
  const config = { method: 'DELETE' };
  return fetcher(endpoint, config);
}

export function upload(endpoint, fileData) {
  const formData = new FormData();
  formData.append('myFile', fileData)
  const config = {
    method: 'POST',
    body: formData,
  };
  return fetcher(endpoint, config);
}
