import React from 'react';

import { storiesOf } from '@storybook/react';

import User from './User';

storiesOf('Dashboard', module)
    .add(
        'User',
        () => <User>User Content</User>
    )
