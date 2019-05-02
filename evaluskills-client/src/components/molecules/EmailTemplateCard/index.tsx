import React, { ReactNode } from 'react';
import IconButton from '../../atoms/IconButton';
import { EmailListingInterface } from '../../../interfaces/Email';

interface Props {
  emailTemplates: any;
  edit: (emailTemplateId: number) => void;
  remove: (emailTemplateId: number) => void;
}

const ClientCard: React.FunctionComponent<Props> = ({ edit, remove, emailTemplates }) => {
  console.log(emailTemplates);
  const actionHandler = (templateId: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (event.currentTarget.name === 'edit') {
      edit(templateId);
    } else if (event.currentTarget.name === 'delete') {
      remove(templateId);
    }
  };

  const renderEmailData = (email: EmailListingInterface) => {
    return (
      <React.Fragment key={email.id}>
        <tr>
          <td>{email.title}</td>
          <td>{email.emailType}</td>

          <td>
            <IconButton
              id={email.id.toString()}
              name="delete"
              icon="trash"
              className="btn-default"
              actionHandler={actionHandler(email.id)}
            >
              Delete
            </IconButton>
            <IconButton
              id={email.id.toString()}
              name="edit"
              icon="edit"
              className="btn-default"
              actionHandler={actionHandler(email.id)}
            >
              Edit
            </IconButton>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="ibox m-b-15">
        <div className="ibox-content">
          <table className="table">
            <thead>
              <tr>
                <th>Email Template Title</th>
                <th>Type</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{emailTemplates && emailTemplates.map(renderEmailData)}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ClientCard;
