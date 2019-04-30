import React from 'react';

import Client from './clientListInterface';
import IconButton from '../../components/atoms/IconButton';
import ClientCard from '../../components/molecules/ClientListCard';
import { userType } from '../../enums';

interface Props {
  listData: Client[];
  edit: (clientId: number) => void;
  remove: (clientId: number) => void;
  login: (clientId: number) => void;
}

const ClientsList: React.FunctionComponent<Props> = ({ listData, edit, remove, login }) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const actionHandler = (clientId: number) => (event: React.MouseEvent) => {
    if (event.currentTarget.id === 'edit') {
      edit(clientId);
    } else if (event.currentTarget.id === 'delete') {
      remove(clientId);
    } else if (event.currentTarget.id === 'login') {
      login(clientId);
    }
  };

  const renderContent = (
    billing: string,
    clientName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    noOfAssessments: number,
    noOfEvaluators: number,
    noOfParticipants: number,
    logo: string,
    id: number,
    isActivated: boolean,
    clientPhone: string
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
          <a href="tel:+18884521505">{phone || clientPhone}</a>
        </td>
        <td>
          <strong className="title">{firstName}</strong>
          <a href="mailto:maria@evalueskills.com">{email}</a>
        </td>
        <td>{billing}</td>
        <td>{noOfAssessments || 0}</td>
        <td>{noOfParticipants || 0}</td>
        <td>{noOfEvaluators || 0}</td>
        <td>
          {isActivated ? (
            <span className="label label-primary">Activate</span>
          ) : (
            <span className="label label-primary label-inactive">inActive</span>
          )}
        </td>
        <td>
          {user && user.roles && user.roles[0] === userType.SUPER_ADMIN ? (
            <IconButton id="login" className="btn-outline btn-primary" actionHandler={actionHandler(id)}>
              Open Client Portal
            </IconButton>
          ) : null}
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

  const renderClientItem = (clientItem: Client) => {
    let content: any;
    if (clientItem.clientContact && clientItem.clientName) {
      content = renderContent(
        clientItem.billingPlanTitle,
        clientItem.clientName,
        clientItem.clientContact.firstName,
        clientItem.clientContact.lastName,
        clientItem.clientContact.email,
        clientItem.clientContact.phone,
        clientItem.noOfAssessments,
        clientItem.noOfEvaluators,
        clientItem.noOfParticipants,
        clientItem.clientLogo,
        clientItem.id,
        clientItem.isActivated,
        clientItem.phone
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
