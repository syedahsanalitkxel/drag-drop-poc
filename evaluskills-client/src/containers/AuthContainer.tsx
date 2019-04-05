import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Login from '../components/pages/Auth/Login';
import LoginTemplate from '../components/templates/LoginTemplate';
import LoginInterface from '../interfaces/Login';
import { login } from '../services/loginService';

const AuthContainer: React.FunctionComponent<RouteComponentProps> = () => {
  const handleLogin = (loginDetails: LoginInterface) => login(loginDetails);

  return (
    <LoginTemplate>
      <Login handleLogin={handleLogin} />
    </LoginTemplate>
  );
};

export default withRouter(AuthContainer);
