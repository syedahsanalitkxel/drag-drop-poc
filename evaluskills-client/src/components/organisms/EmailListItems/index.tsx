import React, { ReactNode } from 'react';

interface Props {
  title?: string;
  type?: string;
  systemName?: string;
  id?: number;
  deleteAction?: (id: any) => void;
  editAction?: (id: any) => void;
}

const EmailListItems: React.FunctionComponent<Props> = ({ title, type, systemName }) => {
  return (
    <tbody>
      <tr>
        <td>Email Template Title</td>
        <td>Email Template Title</td>
        <td>Email Template Title</td>
      </tr>
    </tbody>
  );
};
export default EmailListItems;
