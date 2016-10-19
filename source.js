// react
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

// sections
import Main from './components/pages/main/main'
import Upload from './components/pages/upload/upload'
import Summary from './components/pages/summary/summary'
import Full from './components/pages/full/full'

render((
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <Route path='/upload' component={Upload} />
      <Route path='/summary' component={Summary} />
      <Route path='/full' component={Full} />
      <IndexRoute component={Upload} />
    </Route>
  </Router>
), document.getElementById('root'));
