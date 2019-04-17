import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import AddUser from '.';

interface ModalProps {
  visible?: boolean;
  toggle: () => void;
  name?: string;
  submitHandler: (values: any) => void;
  FormValues: any;
}

const modalValues = {
  email: 'maria@evaluskills.com',
  firstName: 'maria',
  id: '1',
  lastName: 'gracia',
  role: 'admin',
};

const [addUserModalVisible, setAddUserModalVisible] = useState(false);

const toggleAddUserModal = () => {
  setAddUserModalVisible(!addUserModalVisible);
};

const submitHandler = (values: any) => {};

const props: ModalProps = {
  visible: true,
  toggle: toggleAddUserModal,
  submitHandler: submitHandler,
  name: 'Add',
  FormValues: modalValues,
};

storiesOf('AddUser', module).add('AddUser', () => <AddUser {...props} />);
