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
import UserFilterInterface from '../../../interfaces/UserFilter';

import { PageDetailsInterface } from '../../../api/ResponseInterface';

interface Props {
  Users: any;
  filterHandler: (filters: UserFilterInterface) => void;
  submitForm: (values: any, action: string, id?: string) => void;
  pageDetails: PageDetailsInterface;
  resetPager: boolean;
  defaultFilters: any;
}

const DashboardHome: React.FunctionComponent<Props> = ({
  Users,
  filterHandler,
  submitForm,
  pageDetails,
  resetPager,
  defaultFilters,
}) => {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState(Users);
  const [selectedUser, setSelectedUser] = useState({});
  const [user, setUser] = useState({});
  const [action, setAction] = useState('Add');

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleEditUserModal = () => {
    setAction('Edit');
    setEditUserModalVisible(!editUserModalVisible);
  };

  const toggleAddUserModal = () => {
    setAction('Add');
    setAddUserModalVisible(!addUserModalVisible);
  };

  function submitHandler(values: any) {
    setAddUserModalVisible(false);
    setEditUserModalVisible(false);
    if (action === 'Add') {
      submitForm(values, action);
    } else {
      setFormState({ ...formState, ...values });
      submitForm(values, action, values.id);
    }
  }

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const onPageChange = (pageNumber: number) => {
    filterHandler({ pageNumber });
  };

  const addAction = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleAddUserModal();
  };

  const editAction = (userId: string) => {
    const userD: any = formState.find((users: any) => users.id === userId);
    setSelectedUser(userD);
    toggleEditUserModal();
  };

  const removeAction = (userId: string) => {
    // history.push(`/users/remove/${userId}`);
  };

  async function applyFilters(filter: UserFilterInterface) {
    filterHandler(filter);
    setModalVisible(false);
  }

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Users"
            filterAction={filtersClickHandler}
            searchHandler={(search: string) => {
              applyFilters({ search });
            }}
            actionButtonText="Add User"
            actionHandler={addAction}
          />
          <PageBody>
            <div className="ibox m-b-15">
              <div className="table-holder">
                <UsersList listData={Users} edit={editAction} remove={removeAction} />
              </div>
            </div>
            {Users && (
              <Pager
                pageSize={(pageDetails && pageDetails.pageSize) || 0}
                totalRecords={(pageDetails && pageDetails.totalCount) || 0}
                pageNumber={pageDetails.currentPage}
                onPageChanged={onPageChange}
                shouldReset={resetPager}
              />
            )}
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
        defaultFilters={defaultFilters}
      >
        <UserFilter />
      </ESModal>

      <AddUser
        visible={addUserModalVisible}
        toggle={toggleAddUserModal}
        name="Add"
        FormValues={user}
        submitHandler={submitHandler}
      />

      <Editcomponent
        visible={editUserModalVisible}
        toggle={toggleEditUserModal}
        name="Edit"
        FormValues={selectedUser}
        submitHandler={submitHandler}
      />
    </DashboardTemplate>
  );
};

export default DashboardHome;
