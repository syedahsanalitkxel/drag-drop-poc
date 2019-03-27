import React, { ReactNode } from 'react';

import { storiesOf } from '@storybook/react';
import ProfileBadge from '.';

const Container = (storyFn: () => ReactNode) => (
  <div className="row">
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          {storyFn()}
        </div>
      </div>
    </div>
  </div>
);

storiesOf('Molecules.ProfileBadge', module)
  .addDecorator(Container)
  .add('no Props', () => <ProfileBadge />)
  .add('Name Only', () => <ProfileBadge name="Default Name" />)
  .add('Designation Only', () => <ProfileBadge designation="Someone Somehow" />)
  .add('Picture', () => <ProfileBadge profilePicture="img/profile_small.jpg" />)
  .add(
    'All Props',
    () => (
      <ProfileBadge
        name="Usman Tahir"
        designation="PSE"
        profilePicture="img/profile_small.jpg"
      />
    )
  )
