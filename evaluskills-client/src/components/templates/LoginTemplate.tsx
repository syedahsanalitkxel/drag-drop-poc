import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const LoginTemplate: React.FunctionComponent<Props> = ({ children }) => (
  <div className="row">
    <div className="col-md-6">Background Image goes here</div>
    <div className="col-md-6">{children}</div>
  </div>
);

export default LoginTemplate;
