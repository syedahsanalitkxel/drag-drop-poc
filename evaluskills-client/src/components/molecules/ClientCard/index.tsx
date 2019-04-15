import React, { ReactNode } from 'react';
import IconButton from '../../atoms/IconButton';

interface Props {
  item: any;
  edit: (clientId: number) => void;
  remove: (clientId: number) => void;
}

const ClientCard: React.FunctionComponent<Props> = ({ item, edit, remove }) => {
  const actionHandler = (contactId: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (event.currentTarget.name === 'edit') {
      edit(contactId);
    } else if (event.currentTarget.name === 'delete') {
      remove(contactId);
    }
  };

  return (
    <React.Fragment>
      <tr>
        <td className="font-bold">{item.firstName}</td>
        <td>{item.title}</td>
        <td>
          <a href="mailto:robbyrash@gmail.com">{item.email}</a>
        </td>
        <td>
          <a href="tel:042-10284856">{item.phone}</a>
        </td>
        <td>
          <IconButton
            id={item.id}
            name="edit"
            icon="edit"
            className="btn-outline btn-primary"
            actionHandler={actionHandler(item.id)}
          >
            Edit
          </IconButton>
          <IconButton
            id={item.id}
            name="delete"
            icon="trash"
            className="btn-default"
            actionHandler={actionHandler(item.id)}
          >
            Delete
          </IconButton>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default ClientCard;
