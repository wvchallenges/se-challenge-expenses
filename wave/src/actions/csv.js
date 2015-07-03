import { CSV } from 'actionTypes';

export function pending() {
  return {
    type: CSV.PENDING,
  };
}

export function success(response) {
  return {
    type: CSV.SUCCESS,
    payload: response,
  };
}

export function error(error) {
  return {
    type: CSV.ERROR,
    payload: error,
  };
}

export function upload(file) {
  return {
    type: CSV.UPLOAD,
    payload: file,
  }
}
