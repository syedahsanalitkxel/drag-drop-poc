import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AuthContextProvider } from './authContext';
import { userType } from '../../enums';

const AuthContextContainer: React.FunctionComponent<RouteComponentProps> = ({ history, children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
  });

  const authenticate = (token: string, user: string) => {
    const authDetails = JSON.parse(user);
    if (
      authDetails.roles.length &&
      authDetails.roles[0] === userType.SUPER_ADMIN &&
      !authDetails.activeClientId &&
      !authDetails.clients.length
    ) {
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      setState({ isAuthenticated: true });
      history.push('/');
    } else if (
      authDetails.roles.length &&
      authDetails.roles[0] === userType.SUPER_ADMIN &&
      !authDetails.activeClientId &&
      authDetails.clients.length
    ) {
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      setState({ isAuthenticated: true });
      history.push('/account/select-client?role=' + userType.SUPER_ADMIN);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setState({ isAuthenticated: false });
    history.push('/account/login');
  };

  const checkAuthentication = () => !!localStorage.getItem('user') && !!localStorage.getItem('token');

  return (
    <AuthContextProvider value={{ isAuthenticated: state.isAuthenticated, authenticate, logout, checkAuthentication }}>
      {children}
    </AuthContextProvider>
  );
};

export default withRouter(AuthContextContainer);
