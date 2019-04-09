import React, { ReactNode } from 'react';
import TopBarGuest from '../organisms/TopBarGuest';

interface Props {
  children: ReactNode;
}

const GuestTemplate: React.FunctionComponent<Props> = ({ children }) => (
  <React.Fragment>
    <div id="wrapper">
      <div className="eval-wrapper pb-5">
        <div className="container">
          <TopBarGuest />
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default GuestTemplate;
