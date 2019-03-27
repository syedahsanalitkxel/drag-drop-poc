import React, { ReactNode } from 'react';

import { storiesOf } from '@storybook/react';
import Sidebar from '.';


const Container = (storyFn: () => ReactNode) => (
  <div className="row">
    <div className="col-md-3" style={{ height: '600px', background: '#2F4050' }}>
      {storyFn()}
    </div>
  </div>
);

storiesOf('Organisms.Sidebar', module)
  .addDecorator(Container)
  .add('No Title', () => <Sidebar />);
