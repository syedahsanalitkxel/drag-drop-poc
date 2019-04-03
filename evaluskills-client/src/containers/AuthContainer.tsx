import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import Login from '../components/pages/Auth/Login';
import LoginTemplate from '../components/templates/LoginTemplate';
import LoginInterface from '../interfaces/Login';
import { login } from '../services/loginService';

const PageContainer = styled.div`
  padding: 10px 20%;
  background: white;
`;

const AuthContainer: React.FunctionComponent<RouteComponentProps> = () => {
  const handleLogin = (loginDetails: LoginInterface) => login(loginDetails);

  return (
    <LoginTemplate>
      <PageContainer>
        <Login handleLogin={handleLogin} />
      </PageContainer>
    </LoginTemplate>
  );
};

export default withRouter(AuthContainer);
