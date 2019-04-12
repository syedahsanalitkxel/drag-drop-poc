import React, { ReactNode } from 'react';

import LookupContainer from '../../containers/LookupContainer';
import Page from '../atoms/Page';
import Footer from '../organisms/Footer';
import Sidebar from '../organisms/SideBar';
import TopBar from '../organisms/TopBar';

interface Props {
  children: ReactNode;
}

const DashboardTemplate: React.FunctionComponent<Props> = ({ children }) => (
  <React.Fragment>
    <Sidebar />
    <Page>
      <TopBar />
      {children}
      <Footer />
    </Page>
  </React.Fragment>
);

export default DashboardTemplate;
