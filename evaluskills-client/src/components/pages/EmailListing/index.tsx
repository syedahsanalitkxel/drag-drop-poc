import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { emailListing } from '../../../interfaces/Email';
import DashboardTemplate from '../../templates/DashboardTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import IconButton from '../../atoms/IconButton';
interface Props {
  emailTemplates: emailListing[];
  add: () => void;
  filteremailTemplates: (searchQuery: string) => void;
  edit: (instrumentTemplateId: number) => void;
  remove: (instrumentTemplateId: string) => void;
}
const EmailListing: React.FunctionComponent<Props> = ({
  filteremailTemplates,
  emailTemplates,
  add,
  edit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

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
            <IconButton
              id="edit"
              icon="edit"
              className="btn-outline btn-primary"
              actionHandler={() => edit(email.id ? email.id : 1)}
            >
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
            title="Email"
            searchHandler={filteremailTemplates}
            actionButtonText="Add Email"
            actionHandler={add}
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
                  {emailTemplates.map(renderEmailData)}
                </table>
              </div>
            </div>
            <Pager />
          </PageBody>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default EmailListing;
