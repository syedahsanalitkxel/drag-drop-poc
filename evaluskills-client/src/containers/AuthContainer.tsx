import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Login from '../components/pages/Auth/Login';
import LoginTemplate from '../components/templates/LoginTemplate';
import { ErrorContext } from '../context';
import LoginInterface from '../interfaces/Login';
import { login } from '../services/loginService';

const AuthContainer: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const errorContext = useContext(ErrorContext);

  const handleLogin = async (loginDetails: LoginInterface) => {
    try {
      const authDetails = await login(loginDetails);
      window.localStorage.setItem('token', authDetails.token);
      window.localStorage.setItem('user', JSON.stringify(authDetails));
      history.push('/dashboard');
    } catch (e) {
      errorContext.setError(e);
    }
  };

  return (
    <LoginTemplate>
      <Login handleLogin={handleLogin} />
    </LoginTemplate>
  );
};

export default withRouter(AuthContainer);
