import { fork } from 'redux-saga/effects';
import watchCsvUpload from 'sagas/watchCsvUpload';
const sagaList = [
  watchCsvUpload,
];

function* rootSaga() {
  yield sagaList.map(saga => fork(saga));
}

export default rootSaga;
