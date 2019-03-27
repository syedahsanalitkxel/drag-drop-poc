import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ErrorTemplate: React.FunctionComponent<Props> = ({ children }) => (
  <div className="row">
    <div className="col-md-12">
      Error Page
      { children }
    </div>
  </div>
);

export default ErrorTemplate;
