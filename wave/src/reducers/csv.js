import { CSV } from 'actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  pending: false,
  error: false,
});

export default function csv(state = initialState, action = {}) {
  switch (action.type) {
    case CSV.ERROR:
      return state
        .set('pending', false)
        .set('error', true)
        .set('result', action.payload);

    case CSV.PENDING:
      return state
        .set('pending', true)
        .set('error', false)

    case CSV.SUCCESS:
      return state
        .set('pending', false)
        .set('error', true)
        .set('result', action.payload);

    default:
      return state;
  }
}
