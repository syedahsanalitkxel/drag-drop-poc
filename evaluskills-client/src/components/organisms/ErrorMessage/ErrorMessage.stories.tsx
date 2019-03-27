import React, { ReactNode } from 'react';

import { storiesOf } from '@storybook/react';
import ErrorMessage from '.';

const Container = (storyFn: () => ReactNode) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">{storyFn()}</div>
      </div>
    </div>
  </div>
);

storiesOf('Organisms', module)
  .addDecorator(Container)
  .add('Error Message', () => <ErrorMessage />);
