import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import AddClientContact from '../../components/organisms/AddClientContact/index';
import AddClient from './addClient';
import EditClientContact from '../../components/organisms/AddClientContact/index';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

const formValues = {
  address: 'Cantt. MughalPura Lahore',
  billing: '',
  city: 'Lahore',
  clientInformation: '',
  clientName: 'TkXel',
  clientType: '',
  contact: [
    {
      email: 'maria@evaluskills.com',
      firstName: 'Maria',
      id: '1',
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

interface ModalProps {
  index?: number;
  fprops: any;
  children?: React.ReactNode;
  visible?: boolean;
  name?: string;
  toggle?: () => void;
  formStateUpdate: (values: any) => void;
  formValues?: any;
  cancelForm?: () => void;
}
const modalValues = {
  email: 'maria@evaluskills.com',
  firstName: 'maria',
  id: '1',
  lastName: 'gracia',
  role: 'admin',
};

const [addClientContactModalVisible, setAddClientContactModalVisible] = useState(false);
const [editClientContactModalVisible, setEditClientContactModalVisible] = useState(false);

const toggleAddClientContactModal = () => {
  setAddClientContactModalVisible(!addClientContactModalVisible);
};

const toggleEditClientContactModal = () => {
  setEditClientContactModalVisible(!editClientContactModalVisible);
};

function submitForm(values: any) {
  delete values.clientContacts;
  values.clientContacts = values.contact;
}

function ContactHandler(values: any) {
  delete values.clientContacts;
  values.clientContacts = values.contact;
}

function cancelForm() {}

const addContactProps: ModalProps = {
  formStateUpdate: ContactHandler,
  formValues: modalValues,
  fprops: formValues,
  name: 'Add',
  cancelForm: cancelForm,
  toggle: toggleAddClientContactModal,
  visible: true,
};

const editContactProps: ModalProps = {
  formStateUpdate: ContactHandler,
  formValues: modalValues,
  fprops: formValues,
  cancelForm: cancelForm,
  name: 'Edit',
  toggle: toggleEditClientContactModal,
  visible: true,
};

storiesOf('AddClient', module)
  .add('AddClient', () => <AddClient changeListener={submitForm} cancelForm={cancelForm} />)
  .add('AddClientContact renders with props', () => <AddClientContact {...addContactProps} />)
  .add('EditClientContact renders with props', () => <EditClientContact {...editContactProps} />);
