import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AddUser from '../../pages/AddUser';
import User from '../../../interfaces/User';
import UserListInterface from '../../../interfaces/UserList';
import DashboardTemplate from '../../templates/DashboardTemplate';
import ESModal from '../../molecules/Modal';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import UsersList from '../../organisms/UserList/index';
import Editcomponent from '../../pages/AddUser';
import UserFilter from '../../../components/organisms/UserFilter';
import userFilters from '../../../interfaces/UserFilter';
import { ClientFilters } from '../../../interfaces/ClientFilter';
import { getFilteredClient } from '../../../services/clientsService';

// interface Props {
//   changeListener?: (formValues: User) => void;
// }

interface Props {
  Users: any;
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

const DashboardHome: React.FunctionComponent<Props> = ({ Users }) => {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState(initialState);

  //
  // useEffect(() => {
  //   if (changeListener) {
  //     changeListener(formState);
  //   }
  // });

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleEditUserModal = () => {
    setEditUserModalVisible(!editUserModalVisible);
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
  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
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
  async function applyFilters(filter: ClientFilters) {
    // const param = { ...filter };
    // toggleFilterModal();
    // try {
    //   const data: any = await getFilteredClient(param);
    //   setClients(data);
    // } catch (error) {
    //   errorContext.setError(error, true);
    // }
  }

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
            {/*<Pager />*/}
          </PageBody>
        </div>
      </div>
      <ESModal
        title="Filters"
        visible={modalVisible}
        toggle={toggleFilterModal}
        primaryAction={applyFilters}
        primaryText="Apply"
        secondaryText="Reset"
        secondaryAction="reset"
      >
        <UserFilter />
      </ESModal>
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
