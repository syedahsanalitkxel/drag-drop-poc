import React from 'react';

import { ContactInterface } from '../../../interfaces/Client';
import ClientCard from '../../molecules/ClientCard';

interface Props {
  listData: ContactInterface[];
  edit: (clientId: number) => void;
  remove: (clientId: number) => void;
}

const ClientsList: React.FunctionComponent<Props> = ({ listData, edit, remove }) => {
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
            <tbody>
              {listData.length > 0 ? (
                listData.map((list, index) => <ClientCard key={index} item={list} edit={edit} remove={remove} />)
              ) : (
                <tr>
                  <td colSpan={5}> No Contacts Added </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientsList;
