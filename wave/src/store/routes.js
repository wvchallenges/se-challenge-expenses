import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import App from 'containers/app';
import Uploader from 'containers/uploader';

export default (
  <Route path="/" component={ App }>
    <IndexRedirect to="uploader" />
    <Route path="uploader" component={ Uploader }/>
    <Redirect from="*" to="/" />
  </Route>
);
