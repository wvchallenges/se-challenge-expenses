import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = {
    ...createStore(rootReducer, initialState, compose(
      applyMiddleware(..._getMiddleware(), sagaMiddleware),
      ..._getEnhancers(),
    )),
    runSaga: sagaMiddleware.run,
  };

  _enableHotLoader(store);
  return store;
}

function _getMiddleware() {
  return [
    routerMiddleware(browserHistory),
  ];
}

function _getEnhancers() {
  let enhancers = [];
  if (__DEV__ && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension() ];
  }
  return enhancers;
}

function _enableHotLoader(store) {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

export default configureStore;
