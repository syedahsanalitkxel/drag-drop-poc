import React, { useContext } from 'react';

import qs from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router';

import Login from '../components/pages/Auth/Login';
import Reset from '../components/pages/Auth/Reset';
import LoginTemplate from '../components/templates/LoginTemplate';
import ErrorContext from '../context/ErrorContext';
import LoginInterface, { ResetPasswordInterface } from '../interfaces/Login';
import { AuthContext } from '../modules/Auth/authContext';
import { changePassword, login, resetPassword } from '../services/authService';

const AuthContainer: React.FunctionComponent<RouteComponentProps> = ({ location, match }) => {
  const errorContext = useContext(ErrorContext);
  const authContext = useContext(AuthContext);

  const query = qs.parse(location.search) as { email: string; token: string };

  const handleLogin = async (loginDetails: LoginInterface) => {
    try {
      const authDetails = await login(loginDetails);
      authContext.authenticate(authDetails.token, JSON.stringify(authDetails));
    } catch (e) {
      errorContext.setError(e);
    }
  };

  const handleChangePassword = async (passwordDetails: ResetPasswordInterface) => {
    try {
      await changePassword(passwordDetails);
    } catch (e) {
      errorContext.setError(e);
    }
  };

  const sendPasswordResetEmail = async (userEmail: string) => {
    try {
      await resetPassword(userEmail);
    } catch (e) {
      errorContext.setError(e);
    }
  };

  function renderElement() {
    if (match.path === '/account/reset-password') {
      return (
        <Reset
          email={query.email}
          token={query.token}
          handlePasswordChange={handleChangePassword}
          sendPasswordResetEmail={sendPasswordResetEmail}
        />
      );
    }
    return <Login handleLogin={handleLogin} />;
  }

  return <LoginTemplate>{renderElement()}</LoginTemplate>;
};

export default withRouter(AuthContainer);
