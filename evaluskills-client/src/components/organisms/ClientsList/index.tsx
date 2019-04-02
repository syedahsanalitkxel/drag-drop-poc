import React from 'react';

import Client from '../../../interfaces/Client';
import IconButton from '../../atoms/IconButton';
import ClientCard from '../../molecules/ClientCard';

interface Props {
  listData: Client[];
  edit: (clientId: string) => void;
  remove: (clientId: string) => void;
}

const ClientsList: React.FunctionComponent<Props> = ({ listData, edit, remove }) => {
  const actionHandler = (clientId: string) => (event: React.MouseEvent) => {
    if (event.currentTarget.id === 'edit') {
      edit(clientId);
    } else if (event.currentTarget.id === 'delete') {
      remove(clientId);
    }
  };

  const renderContent = (
    clientName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    plan: string,
    noOfAssessments: string,
    noOfEvaluators: string,
    noOfParticipants: string,
    id: string,
    status: string
  ) => (
    <React.Fragment>
      <tr>
        <td>
          <img src="img/profile_small.jpg" alt="Ellipse" />
        </td>
        <td>
          <strong className="client">{clientName}</strong>
        </td>
        <td>
          <a href="tel:+18884521505">{phone}</a>
        </td>
        <td>
          <strong className="title">{firstName}</strong>
          <a href="mailto:maria@evalueskills.com">{email}</a>
        </td>
        <td>{plan}</td>
        <td>{noOfAssessments}</td>
        <td>{noOfParticipants}</td>
        <td>
          <strong className="number">{noOfEvaluators}</strong>
        </td>
        <td>
          {status === 'Active' ? (
            <span className="label label-primary">{status}</span>
          ) : (
            <span className="label label-primary label-inactive">{status}</span>
          )}
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

  const renderClientItem = (clientItem: Client) => {
    let content: any;
    if (clientItem.contact && clientItem.clientName) {
      content = renderContent(
        clientItem.clientName,
        clientItem.contact[0].firstName,
        clientItem.contact[0].lastName,
        clientItem.contact[0].email,
        clientItem.contact[0].phone,
        clientItem.plan,
        clientItem.noOfAssessments,
        clientItem.noOfEvaluators,
        clientItem.noOfParticipants,
        clientItem.id,
        clientItem.status
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
                <th>Logo</th>
                <th>Client Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Plan</th>
                <th>No. of Assessments</th>
                <th>No. of Participants</th>
                <th>No. of Evaluators</th>
                <th>Status</th>
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
