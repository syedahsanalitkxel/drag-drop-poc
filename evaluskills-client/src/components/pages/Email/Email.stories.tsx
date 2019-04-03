import React from 'react';

import { storiesOf } from '@storybook/react';

import EmailListing from '.';

storiesOf('Email', module).add('Email Listing page', () => (
  <EmailListing>User Content</EmailListing>
));
