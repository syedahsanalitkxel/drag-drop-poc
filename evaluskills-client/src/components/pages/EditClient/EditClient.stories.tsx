import React from 'react';

import { storiesOf } from '@storybook/react';

import EditClient from './index';

const formValues = {
  address: 'Cantt. MughalPura Lahore',
  billing: '',
  city: 'Lahore',
  clientInformation: '',
  clientName: 'TkXel',
  clientType: '',
  contact: [
    {
      id: '1',
      email: 'maria@evaluskills.com',
      firstName: 'Maria',
      lastName: ' Garcia',
      phone: '+1 818-452-1505',
      role: '',
    },
  ],
  id: '2',
  noOfAssessments: '25',
  noOfEvaluators: '28',
  noOfParticipants: '30',
  phone: '+1 818-452-1505',
  plan: 'Plan 01',
  school: 'P.R Boys high school',
  state: 'punjab',
  status: 'Active',
  userEmail: 'ali@tkxel.com',
  userFirstName: 'ali',
  userLastName: 'raza',
  zip: '54000',
};

const action = 'edit';
const props = { defaultValue: { formValues }, action: { action } };

storiesOf('EditClient', module)
  .add('EditClient', () => <EditClient />)
  .add('EditClient with props', () => <EditClient {...props} />);
