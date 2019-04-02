import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AddUser from '../../pages/AddUser';
import { emailListing } from '../../../interfaces/Email';
import DashboardTemplate from '../../templates/DashboardTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import ESModal from '../Client';
import EmailListItems from '../../organisms/EmailListItems';
import CardTitle from 'reactstrap/lib/CardTitle';
import IconButton from '../../atoms/IconButton';
const usersData = [
  { id: 1, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
  { id: 2, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
  { id: 3, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
  { id: 4, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
];

const EmailListing: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);

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
    alert(searchQuery);
  };
  const deleteEmail = (name: any) => {
    // this.setState({
    //     todo: this.state.todo.filter(el => el !== name)
    // })
  };
  const addAction = (event: React.MouseEvent) => {
    event.preventDefault();
    //toggleAddUserModal();
    history.push('/setting/email/add');
    // alert(`add button clicked ${event.timeStamp}`);
  };
  const editAction = (event: React.MouseEvent) => {
    event.preventDefault();
    //toggleAddUserModal();
    history.push('/setting/email/edit/1');
    // alert(`add button clicked ${event.timeStamp}`);
  };

  const renderEmailData = (email: emailListing) => {
    return (
      <React.Fragment key={email.id}>
        <tr>
          <td>
            <strong>{email.title}</strong>
          </td>
          <td>
            <strong>{email.type}</strong>
          </td>
          <td>{email.systemName}</td>
          <td>
            <IconButton id="delete" icon="trash" className="btn-default" actionHandler={() => {}}>
              Delete
            </IconButton>
            <IconButton id="edit" icon="trash" className="btn-default" actionHandler={editAction}>
              Edit
            </IconButton>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Users"
            searchHandler={searchHandler}
            actionButtonText="Add Email"
            actionHandler={addAction}
          />
          <PageBody>
            <div className="ibox m-b-15">
              <div className="ibox-content">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Email Template Title</th>
                      <th>Type</th>
                      <th>System Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {usersData.map(renderEmailData)}
                </table>
              </div>
            </div>
            <Pager />
          </PageBody>
        </div>
      </div>

      <AddUser visible={addUserModalVisible} toggle={toggleAddUserModal} />
    </DashboardTemplate>
  );
};

export default withRouter(EmailListing);
