import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LookupContainer from './containers/LookupContainer';
import AuthContextContainer from './modules/Auth/container';
import Routes from './Routes';

const App = () => (
  <div id="wrapper">
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextContainer>
          <LookupContainer>
            <Routes />
          </LookupContainer>
        </AuthContextContainer>
      </BrowserRouter>
    </ErrorBoundary>
  </div>
);

export default App;
