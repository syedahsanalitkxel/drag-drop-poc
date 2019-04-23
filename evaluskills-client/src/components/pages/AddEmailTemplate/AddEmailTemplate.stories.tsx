import React from 'react';

import { storiesOf } from '@storybook/react';

import AddEmailPage from '.';
async function submitEmailTemplate() {}
storiesOf('Email', module).add('Add Email page', () => (
  <AddEmailPage submitEmailTemplate={submitEmailTemplate}>User Content</AddEmailPage>
));
