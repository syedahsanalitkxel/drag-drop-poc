import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry';
import Routes from './Routes';

const App = () => (
  <div id="wrapper">
    <ErrorBoundary>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ErrorBoundary>
  </div>
);

export default App;
