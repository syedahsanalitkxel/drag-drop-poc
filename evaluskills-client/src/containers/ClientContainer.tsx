import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import IClientList from '../interfaces/Client';
import { getClients } from '../services/clientsService';

const ClientList: IClientList[] = [
  {
    id: 1,
    clientName: 'TkXel',
    clientNumber: '+1 818-452-1505',
    status: 'Active',
    plan: 'Plan 01',
    contactName: 'Maria Garcia',
    email: 'maria@evaluskills.com',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
  },
  {
    id: 2,
    clientName: 'TkXel',
    clientNumber: '+1 828-452-1505',
    status: 'inActive',
    plan: 'Plan 01',
    contactName: 'Maria Garcia',
    email: 'maria@evaluskills.com',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
  },
  {
    id: 3,
    clientName: 'TkXel',
    clientNumber: '+1 838-452-1505',
    status: 'Active',
    plan: 'Plan 01',
    contactName: 'Maria Garcia',
    email: 'maria@evaluskills.com',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
  },
  {
    id: 4,
    clientName: 'TkXel',
    clientNumber: '+1 848-452-1505',
    status: 'Active',
    plan: 'Plan 01',
    contactName: 'Maria Garcia',
    email: 'maria@evaluskills.com',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
  },
  {
    id: 5,
    clientName: 'TkXel',
    clientNumber: '+1 858-452-1505',
    status: 'inActive',
    plan: 'Plan 01',
    contactName: 'Maria Garcia',
    email: 'maria@evaluskills.com',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
  },
  {
    id: 6,
    clientName: 'TkXel',
    clientNumber: '+1 868-452-1505',
    status: 'Active',
    plan: 'Plan 01',
    contactName: 'Maria Garcia',
    email: 'maria@evaluskills.com',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
  },
];

const ClientListContainer: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [clients, setClients] = useState(ClientList);
  // TODO: Try moving filters to context
  const [filters, setFilters] = useState({});

  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    // fetchClients();
    return function cleanup() {
      setClients(ClientList);
      setFilters({});
    };
  }, []);

  // async function fetchClients() {
  //     const data = await getClients();
  //     setClients(data);
  // }

  function filterClients(searchQuery: string) {
    alert(searchQuery);
  }

  function addClient() {
    history.push('/clients/add');
  }

  function editClient(clientId: string) {
    history.push(`/clients/edit/${clientId}`);
  }

  function deleteClient(clientId: string) {
    alert(`deleting => ${clientId}`);
  }

  return (
    <ClientsList
      clients={clients}
      filterClients={filterClients}
      add={addClient}
      remove={editClient}
      edit={deleteClient}
    />
  );
};

export default withRouter(ClientListContainer);
