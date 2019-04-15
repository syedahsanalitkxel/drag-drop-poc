import React from 'react';

import { storiesOf } from '@storybook/react';

import User from '.';
import UserList from '../../../interfaces/UserList';
import UsersFilterInterface from '../../../interfaces/UserFilter';

const usersData: any = [];
function filterHandler(filters: UsersFilterInterface) {
  // fetchAllUsers({ ...state.filters, ...filters });
}

function submitForm(values: any, action: string, id?: string) {
  // fetchAllUsers({ ...state.filters, ...filters });
}
storiesOf('Dashboard', module).add('User', () => (
  <User Users={usersData} filterHandler={filterHandler} submitForm={submitForm}>
    User Content
  </User>
));
