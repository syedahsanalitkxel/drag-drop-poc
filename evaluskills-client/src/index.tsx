import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './iconFonts';
import './index.scss';

import * as serviceWorker from './serviceWorker';

const render = () => {
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
};

render();
serviceWorker.register();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
