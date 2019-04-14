import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AuthContextContainer from './modules/Auth/container';
import LookupContainer from './modules/Lookup/conteiner';
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
