import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';

import App from './components/App';
import Records from './components/Records';

import './assets/styles/app.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/records" component={Records} />
  </Router>
), document.getElementById('app'));
