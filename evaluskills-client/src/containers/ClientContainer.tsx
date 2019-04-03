import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import IClientList from '../interfaces/Client';
import { getClients } from '../services/clientsService';

const ClientList: IClientList[] = [
  {
    address: 'Cantt. MughalPura Lahore',
    billing: 'Biling 2',
    city: 'Lahore',
    clientInformation: 'Tkxel Client',
    clientName: 'TkXel',
    clientType: 'Educational institute',
    contact: [
      {
        id: '1',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
      {
        id: '2',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
      {
        id: '3',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
      {
        id: '4',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
    ],
    id: '1',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
    phone: '+1 818-452-1505',
    plan: 'Plan 01',
    school: 'P.R Boys high school',
    state: 'punjab',
    status: 'inActive',
    userEmail: 'ali@tkxel.com',
    userFirstName: 'ali',
    userLastName: 'raza',
    zip: '54000',
  },
  {
    address: 'Cantt. MughalPura Lahore',
    billing: '',
    city: 'Lahore',
    clientInformation: '',
    clientName: 'TkXel',
    clientType: '',
    contact: [
      {
        id: '1',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
    ],
    id: '2',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
    phone: '+1 818-452-1505',
    plan: 'Plan 01',
    school: 'P.R Boys high school',
    state: 'punjab',
    status: 'Active',
    userEmail: 'ali@tkxel.com',
    userFirstName: 'ali',
    userLastName: 'raza',
    zip: '54000',
  },
  {
    address: 'Cantt. MughalPura Lahore',
    billing: '',
    city: 'Lahore',
    clientInformation: '',
    clientName: 'TkXel',
    clientType: '',
    contact: [
      {
        id: '1',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
    ],
    id: '3',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
    phone: '+1 818-452-1505',
    plan: 'Plan 01',
    school: 'P.R Boys high school',
    state: 'punjab',
    status: 'Active',
    userEmail: 'ali@tkxel.com',
    userFirstName: 'ali',
    userLastName: 'raza',
    zip: '54000',
  },
  {
    address: 'Cantt. MughalPura Lahore',
    billing: '',
    city: 'Lahore',
    clientInformation: '',
    clientName: 'TkXel',
    clientType: '',
    contact: [
      {
        id: '1',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
    ],
    id: '4',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
    phone: '+1 818-452-1505',
    plan: 'Plan 01',
    school: 'P.R Boys high school',
    state: 'punjab',
    status: 'inActive',
    userEmail: 'ali@tkxel.com',
    userFirstName: 'ali',
    userLastName: 'raza',
    zip: '54000',
  },
  {
    address: 'Cantt. MughalPura Lahore',
    billing: '',
    city: 'Lahore',
    clientInformation: '',
    clientName: 'TkXel',
    clientType: '',
    contact: [
      {
        id: '1',
        email: 'maria@evaluskills.com',
        firstName: 'Maria',
        lastName: ' Garcia',
        phone: '+1 818-452-1505',
        role: '',
      },
    ],
    id: '5',
    noOfAssessments: '25',
    noOfEvaluators: '28',
    noOfParticipants: '30',
    phone: '+1 818-452-1505',
    plan: 'Plan 01',
    school: 'P.R Boys high school',
    state: 'punjab',
    status: 'Active',
    userEmail: 'ali@tkxel.com',
    userFirstName: 'ali',
    userLastName: 'raza',
    zip: '54000',
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
      remove={deleteClient}
      edit={editClient}
    />
  );
};

export default withRouter(ClientListContainer);
