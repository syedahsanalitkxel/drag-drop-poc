import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LookupContainer from './containers/LookupContainer';
import Routes from './Routes';

const App = () => (
  <div id="wrapper">
    <ErrorBoundary>
      <LookupContainer>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LookupContainer>
    </ErrorBoundary>
  </div>
);

export default App;
