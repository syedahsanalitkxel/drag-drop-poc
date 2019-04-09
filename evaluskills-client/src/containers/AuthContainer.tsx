import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Login from '../components/pages/Auth/Login';
import LoginTemplate from '../components/templates/LoginTemplate';
import { ErrorContext } from '../context';
import LoginInterface, { ResetPasswordInterface } from '../interfaces/Login';
import { login } from '../services/loginService';
import Reset from '../components/pages/Auth/Reset';

const AuthContainer: React.FunctionComponent<RouteComponentProps> = ({ match, history }) => {
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

  const handleChangePassword = async (passwordDetails: ResetPasswordInterface) => {
    try {
      // const authDetails = await login(loginDetails);
    } catch (e) {
      errorContext.setError(e);
    }
  };

  function renderElement() {
    switch (match.path) {
      case '/reset-password':
        return <Reset handlePasswordChange={handleChangePassword} />;

      default:
        return <Login handleLogin={handleLogin} />;
    }
  }

  return <LoginTemplate>{renderElement()}</LoginTemplate>;
};

export default withRouter(AuthContainer);
