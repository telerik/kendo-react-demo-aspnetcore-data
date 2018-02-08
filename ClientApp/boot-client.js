import './css/site.css';
import './css/kendo-theme-default-all.css';
import 'bootstrap';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';


const baseUrl = document.getElementsByTagName('base')[ 0 ].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={history}>
        <Routes />
      </Router>
    </AppContainer>, document.getElementById('react-app'));
};

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept('./Routes', () => {
    //Routes = require('./Routes');
    renderApp();
  });
}
