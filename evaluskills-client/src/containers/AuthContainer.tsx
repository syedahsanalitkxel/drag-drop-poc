import React, { useContext, useEffect, useState } from 'react';

import qs from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router';
import Login from '../components/pages/Auth/Login';
import Reset from '../components/pages/Auth/Reset';
import SelectClientList from '../components/pages/Auth/SelectClientList';
import SetPassword from '../components/pages/Auth/SetPassword';
import LoginTemplate from '../components/templates/LoginTemplate';
import ErrorContext from '../context/ErrorContext';
import LoginInterface, { ResetPasswordInterface } from '../interfaces/Login';
import { AuthContext } from '../modules/Auth/authContext';
import { changePassword, login, resetPassword, verifyUserAPi } from '../services/authService';

const AuthContainer: React.FunctionComponent<RouteComponentProps> = ({ location, match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const errorContext = useContext(ErrorContext);
  const authContext = useContext(AuthContext);

  const query = qs.parse(location.search) as { email: string; token: string; UserId: string; Code: string };

  useEffect(() => {
    setEmailSent(false);
  }, [match.path]);

  const handleLogin = async (loginDetails: LoginInterface) => {
    try {
      const authDetails = await login(loginDetails);
      authDetails.clients.pop();
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
    setIsLoading(true);
    setEmailSent(true);
    try {
      await resetPassword(userEmail);
      setIsLoading(false);
      setEmailSent(true);
    } catch (e) {
      // errorContext.setError(e);
      setIsLoading(false);
    }
  };
  const emailConfirmation = async (userId: string, code: string, password: string) => {
    try {
      await verifyUserAPi(userId, code, password);
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
          isLoading={isLoading}
          emailSent={emailSent}
        />
      );
    } else if (query.UserId && query.Code) {
      return <SetPassword userId={query.UserId} code={query.Code} verifyUser={emailConfirmation} />;
    } else if (match.path === '/account/select-client') {
      return <SelectClientList />;
    }
    return <Login handleLogin={handleLogin} />;
  }

  return <LoginTemplate>{renderElement()}</LoginTemplate>;
};

export default withRouter(AuthContainer);
