import polyfill from 'babel-polyfill';
import Promise from 'bluebird';
global.Promise = Promise;

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
