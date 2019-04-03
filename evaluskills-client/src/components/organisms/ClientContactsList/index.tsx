import React from 'react';

import Client, { ContactInterface } from '../../../interfaces/Client';
import IconButton from '../../atoms/IconButton';
import ClientCard from '../../molecules/ClientCard';

interface Props {
  listData: ContactInterface[];
}

const ClientsList: React.FunctionComponent<Props> = ({ listData }) => {
  const actionHandler = (clientId: string) => (event: React.MouseEvent) => {
    // if (event.currentTarget.id === 'edit') {
    //     edit(clientId);
    // } else if (event.currentTarget.id === 'delete') {
    //     remove(clientId);
    // }
  };

  const renderContent = (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string
  ) => (
    <React.Fragment>
      <tr>
        <td className="font-bold">{firstName}</td>
        <td>Business Client</td>
        <td>
          <a href="mailto:robbyrash@gmail.com">{email}</a>
        </td>
        <td>
          <a href="tel:042-10284856">{phone}</a>
        </td>
        <td>
          <IconButton
            id="edit"
            icon="edit"
            className="btn-outline btn-primary"
            actionHandler={actionHandler(id)}
          >
            Edit
          </IconButton>
          <IconButton
            id="delete"
            icon="trash"
            className="btn-default"
            actionHandler={actionHandler(id)}
          >
            Delete
          </IconButton>
        </td>
      </tr>
    </React.Fragment>
  );

  const renderClientItem = (clientItem: ContactInterface) => {
    let content: any;
    if (clientItem) {
      content = renderContent(
        clientItem.id,
        clientItem.firstName,
        clientItem.lastName,
        clientItem.email,
        clientItem.phone,
        clientItem.role
      );
    }

    return <ClientCard key={clientItem.id}>{{ content }}</ClientCard>;
  };

  return (
    <React.Fragment>
      <div className="ibox m-b-15">
        <div className="table-holder">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th />
              </tr>
            </thead>
            <tbody>{listData && listData.map(renderClientItem)}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientsList;
