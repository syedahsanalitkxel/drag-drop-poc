import React from 'react';

import { storiesOf } from '@storybook/react';

import User from '.';

const usersData = [
  { id: '1', firstName: 'Robby', lastName: 'Rash', role: 'Admin', email: 'robbyrash@gmail.com' },
  { id: '2', firstName: 'Jhon', lastName: 'Doe', role: 'User', email: 'jhondoe@gmail.com' },
  {
    id: '3',
    firstName: 'Bella',
    lastName: 'William',
    role: 'Admin',
    email: 'bellawilliam@gmail.com',
  },
  { id: '4', firstName: 'Rash', lastName: 'Rash', role: 'User', email: 'rockrash@gmail.com' },
];

storiesOf('Dashboard', module).add('User', () => <User Users={usersData}>User Content</User>);
