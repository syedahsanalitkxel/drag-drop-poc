import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import AddUser from '.';

interface ModalProps {
  visible?: boolean;
  toggle: () => void;
  name?: string;
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

const props: ModalProps = {
  visible: true,
  toggle: toggleAddUserModal,
  name: 'Add',
  FormValues: modalValues,
};

storiesOf('AddUser', module).add('AddUser', () => <AddUser {...props} />);
