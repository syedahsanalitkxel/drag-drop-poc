import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import IClientList, { ClientUserInterface, ContactInterface } from '../interfaces/Client';
import { getClients } from '../services/clientsService';
import { ErrorContext } from '../context';

const client: ContactInterface = {
  clientId: 1,
  email: 'maria@evaluskills.com',
  firstName: 'Maria',
  id: 1,
  lastName: ' Garcia',
  phone: ' Garcia',
  title: ' Garcia',
};

const user: ClientUserInterface = {
  email: 'maria@evaluskills.com',
  firstName: 'Maria',
  id: 1,
  lastName: ' Garcia',
};

const ClientList: IClientList[] = [
  {
    billingPlanTitle: 'Biling 2',
    clientContact: client,
    clientLogo: 'aaaaaaaaa',
    clientName: 'TkXel',
    clientUser: user,
    id: 1,
    isActivated: true,
    noOfAssessments: 25,
    noOfEvaluators: 28,
    noOfParticipants: 30,
    phone: '+1 818-452-1505',
  },
];

const ClientListContainer: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const errorContext = useContext(ErrorContext);
  const [clients, setClients] = useState(ClientList);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchClients();
    return function cleanup() {
      setClients(ClientList);
    };
  }, []);

  async function fetchClients() {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  function filterClients(searchQuery: string) {
    alert(searchQuery);
  }

  function addClient() {
    history.push('/clients/add');
  }

  function editClient(clientId: number) {
    history.push(`/clients/edit/${clientId}`);
  }

  function deleteClient(clientId: number) {
    alert(`deleting => ${clientId}`);
  }

  return (
    <ClientsList
      clients={clients}
      filterClients={filterClients}
      add={addClient}
      remove={deleteClient}
      edit={editClient}
    />
  );
};

export default withRouter(ClientListContainer);
