import React from 'react';

import { storiesOf } from '@storybook/react';

import User from '.';
import UserList from '../../../interfaces/UserList';
import UsersFilterInterface from '../../../interfaces/UserFilter';
import { PageDetailsInterface } from '../../../api/ResponseInterface';

const filter: PageDetailsInterface = {
  currentPage: 1,
  pageSize: 10,
};
const usersData: any = [];
function filterHandler(filters: UsersFilterInterface) {
  // fetchAllUsers({ ...state.filters, ...filters });
}

function submitForm(values: any, action: string, id?: string) {
  // fetchAllUsers({ ...state.filters, ...filters });
}
storiesOf('Dashboard', module).add('User', () => (
  <User Users={usersData} filterHandler={filterHandler} submitForm={submitForm} pageDetails={filter} resetPager={false}>
    User Content
  </User>
));
