import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const HomeTemplate: React.FunctionComponent<Props> = ({ children }) => (
  <div className="row">
    <div className="col-md-12">
      Home Page
      {children}
    </div>
  </div>
);

export default HomeTemplate;
