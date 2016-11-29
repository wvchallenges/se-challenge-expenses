import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { CSV } from 'actionTypes';
import * as csvActions from 'actions/csv';
import { uploadCSV } from 'api';

function* csvUploadFlow({ payload }) {
  try {
    yield put(csvActions.pending());
    const response = yield call(uploadCSV, payload);
    yield put(csvActions.success(response));
  } catch (err) {
    yield put(csvActions.error(response));
  }
};

export default function* watchCsvUpload() {
  yield takeLatest(CSV.UPLOAD, csvUploadFlow);
}
