import React from 'react';
import userInterface from '../../../interfaces/User';
import IconButton from '../../atoms/IconButton';
import UserCard from '../../molecules/UserCard';

interface Props {
  listData: any;
  edit: (userId: string) => void;
  remove: (userId: string) => void;
}

const UsersList: React.FunctionComponent<Props> = ({ listData, edit, remove }) => {
  // TODO: Add checkbox support
  // TODO: Add support remove action handlers and replace them with CheckBox
  const actionHandler = (userId: string) => (event: React.MouseEvent) => {
    if (event.currentTarget.id === 'edit') {
      edit(userId);
    } else if (event.currentTarget.id === 'delete') {
      remove(userId);
    }
  };

  const renderContent = (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    status: string
  ) => (
    <React.Fragment>
      <tr>
        <td>{id}</td>
        <td>
          <strong>{firstName}</strong>
        </td>
        <td>
          <strong>{lastName}</strong>
        </td>
        <td>
          <strong>{role}</strong>
        </td>
        <td>
          <strong>{status}</strong>
        </td>
        <td>{email}</td>
        <td>
          <IconButton id="edit" icon="edit" className="btn-outline btn-primary" actionHandler={actionHandler(id)}>
            Edit
          </IconButton>
          <IconButton id="delete" icon="trash" className="btn-default" actionHandler={actionHandler(id)}>
            Delete
          </IconButton>
        </td>
      </tr>
    </React.Fragment>
  );

  const renderUserItem = (userItem: any) => {
    const content = renderContent(
      userItem.id,
      userItem.firstName,
      userItem.lastName,
      userItem.email,
      userItem.role,
      userItem.status
    );

    return <UserCard key={userItem.id}>{{ content }}</UserCard>;
  };

  return (
    <React.Fragment>
      <div className="ibox m-b-15">
        <div className="table-holder">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email</th>
                <th />
              </tr>
            </thead>
            <tbody>{listData && listData.map(renderUserItem)}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UsersList;
