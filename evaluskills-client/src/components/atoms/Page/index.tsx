import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Page: React.FunctionComponent<Props> = ({ children }) => (
  <div id="page-wrapper" className="gray-bg dashbard-1">
    {children}
  </div>
);

export default Page;
