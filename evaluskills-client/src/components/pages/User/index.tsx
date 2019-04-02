import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AddUser from '../../pages/AddUser';
import User from '../../../interfaces/User';
import DashboardTemplate from '../../templates/DashboardTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import UsersList from '../../organisms/UserList';
import Editcomponent from '../../pages/AddUser';

interface Props {
  changeListener?: (formValues: User) => void;
}

const initialState = {
  email: ' ',
  firstName: ' ',
  id: ' ',
  lastName: ' ',
  role: ' ',
};

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

const DashboardHome: React.FunctionComponent<Props> = ({ changeListener }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
  });

  const toggleEditUserModal = () => {
    setEditUserModalVisible(!editUserModalVisible);
  };

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleAddUserModal = () => {
    setAddUserModalVisible(!addUserModalVisible);
  };

  const filterAction = (event: React.MouseEvent) => {
    // alert(`Filter button clicked ${event.timeStamp}`);
    event.preventDefault();
    toggleFilterModal();
  };

  const searchHandler = (searchQuery: string) => {
    // alert(searchQuery);
  };

  const addAction = (event: React.MouseEvent) => {
    event.preventDefault();
    setFormState(initialState);
    toggleAddUserModal();
    // history.push('/users/add');
    // alert(`add button clicked ${event.timeStamp}`);
  };

  const editAction = (userId: string) => {
    // event.preventDefault();
    const userD: any = usersData.find(user => user.id === userId);
    setFormState(userD);
    toggleEditUserModal();
    // history.push(`/users/edit/${userId}`);
  };

  const removeAction = (userId: string) => {
    // history.push(`/users/remove/${userId}`);
  };

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Users"
            filterAction={filterAction}
            searchHandler={searchHandler}
            actionButtonText="Add User"
            actionHandler={addAction}
          />
          <PageBody>
            <div className="ibox m-b-15">
              <div className="table-holder">
                <UsersList listData={usersData} edit={editAction} remove={removeAction} />
              </div>
            </div>
            <Pager />
          </PageBody>
        </div>
      </div>
      {/* Filter Modal */}
      <div>
        <Modal isOpen={modalVisible} toggle={toggleFilterModal}>
          <ModalHeader toggle={toggleFilterModal}>Filters</ModalHeader>
          <ModalBody>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label font-bold">Role</label>
              <div className="col-sm-8">
                <select className="form-control m-b col-sm-12" name="role">
                  <option>Select Role</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                </select>
              </div>
            </div>
            <div className="hr-line-dashed" />
            <div className="form-group row">
              <label className="col-sm-4 col-form-label font-bold">Clients</label>
              <div className="col-sm-8">
                <select className="form-control m-b col-sm-12" name="name">
                  <option>Select Clients</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleFilterModal}>
              Reset
            </Button>
            <Button color="secondary" onClick={toggleFilterModal}>
              Apply
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <AddUser
        visible={addUserModalVisible}
        toggle={toggleAddUserModal}
        name="Add"
        FormValues={formState}
      />
      <Editcomponent
        visible={editUserModalVisible}
        toggle={toggleEditUserModal}
        name="Edit"
        FormValues={formState}
      />
      ;
    </DashboardTemplate>
  );
};

export default DashboardHome;
