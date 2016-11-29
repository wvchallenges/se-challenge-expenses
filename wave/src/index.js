import 'es5-shim';
import 'es6-shim';
import 'es6-promise';
import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import rootSaga from 'sagas';
import routes from 'routes';
import configureStore from 'store/configure-store';
import 'styles/index.css';

const store = configureStore({});
store.runSaga(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <Router history={ history }>
        { routes }
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
