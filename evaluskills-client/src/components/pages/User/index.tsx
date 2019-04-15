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

interface Props {
  Users: any;
  filterHandler: (filters: UserFilterInterface) => void;
}

const DashboardHome: React.FunctionComponent<Props> = ({ Users, filterHandler }) => {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState({});

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleEditUserModal = () => {
    setEditUserModalVisible(!editUserModalVisible);
  };

  const toggleAddUserModal = () => {
    setAddUserModalVisible(!addUserModalVisible);
  };

  function submitHandler(values: any) {
    // setAddUserModalVisible(false);
    // console.log(values);
    // values.stateId = parseInt(values.stateId, 10);
    // values.billingPlanId = parseInt(values.billingPlanId, 10);
    // // values.clientTypeId = parseInt(values.clientTypeId, 10);
    // changeListener({ ...formState, ...values });
    // setFormState({ ...formState, ...values });
    // if (action === 'edit' && file) {
    //   changeListener({ ...formState, ...values, clientLogo: file });
    //   setFormState({ ...formState, ...values, clientLogo: file });
    // }
  }

  const searchHandler = (searchQuery: string) => {
    // alert(searchQuery);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const onPageChange = (pageNumber: number) => {
    applyFilters({ pageNumber });
  };

  const addAction = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleAddUserModal();
  };

  const editAction = (userId: string) => {
    // event.preventDefault();
    // const userD: any = formState.find(user => user.id === userId);
    // setFormState(userD);
    // toggleEditUserModal();
    // history.push(`/users/edit/${userId}`);
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
            searchHandler={searchHandler}
            actionButtonText="Add User"
            actionHandler={addAction}
          />
          <PageBody>
            <div className="ibox m-b-15">
              <div className="table-holder">
                <UsersList listData={Users} edit={editAction} remove={removeAction} />
              </div>
            </div>
            <Pager pageSize={10} totalRecords={10} onPageChanged={onPageChange} />
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
        submitHandler={submitHandler}
      />

      <Editcomponent
        visible={editUserModalVisible}
        toggle={toggleEditUserModal}
        name="Edit"
        FormValues={formState}
        submitHandler={submitHandler}
      />
    </DashboardTemplate>
  );
};

export default DashboardHome;
