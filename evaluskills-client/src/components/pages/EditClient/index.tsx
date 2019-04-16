import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RouteParams from '../../../interfaces/RouteParams';
import EditComponent from '../AddClient';
import AddEditClientInterface, { ClientUserInterface } from '../../../interfaces/AddEditClient';

const user: ClientUserInterface = {
  email: 'maria@evaluskills.com',
  firstName: 'Maria',
  id: 1,
  lastName: ' Garcia',
};

const ClientData: AddEditClientInterface[] = [
  {
    address1: 'Cantt. MughalPura Lahore',
    address2: 'Cantt. MughalPura Lahore',
    billingPlanId: 1,
    city: 'Lahore',
    clientContacts: [
      {
        clientId: 1,
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        id: 1,
        lastName: ' Garcia',
        phone: ' Garcia',
        title: ' Garcia',
      },
    ],
    clientName: 'TkXel',
    clientTypeId: 0,
    clientUser: user,
    id: 1,
    phone: '+1 818-452-1505',
    stateId: 0,
    subsidiary: '',
    zip: '54000',
  },
];

const EditClient: React.FunctionComponent<RouteComponentProps<RouteParams>> = ({ history, location, match }) => {
  function submitForm(values: any) {
    delete values.clientContacts;
    values.clientContacts = values.contact;
    console.log(values);
  }
  function cancelForm() {}
  const clientData: any = ClientData.find(clients => clients.id.toString() === match.params.id);
  return <EditComponent defaultValues={clientData} action="edit" changeListener={submitForm} cancelForm={cancelForm} />;
};

export default withRouter(EditClient);
