import React from 'react';

import Client from '../../../interfaces/Client';

interface Props {
  listData: Client[];
}

const ClientsList: React.FunctionComponent<Props> = ({ listData }) => {
  const renderClientData = (ClientData: Client) => {
    return (
      <React.Fragment key={ClientData.id}>
        <tr>
          <td>
            <img src="img/profile_small.jpg" alt="Ellipse" />
          </td>
          <td>
            <strong className="client">{ClientData.clientName}</strong>
          </td>
          <td>
            <a href="tel:+18884521505">{ClientData.clientNumber}</a>
          </td>
          <td>
            <strong className="title">{ClientData.contactName}</strong>
            <a href="mailto:maria@evalueskills.com">{ClientData.email}</a>
          </td>
          <td>{ClientData.plan}</td>
          <td>{ClientData.noOfAssessments}</td>
          <td>{ClientData.noOfParticipants}</td>
          <td>
            <strong className="number">{ClientData.noOfEvaluators}</strong>
          </td>
          <td>
            {ClientData.status === 'Active' ? (
              <span className="label label-primary">{ClientData.status}</span>
            ) : (
              <span className="label label-primary label-inactive">{ClientData.status}</span>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
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
              </tr>
            </thead>
            <tbody>{listData && listData.map(renderClientData)}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientsList;
