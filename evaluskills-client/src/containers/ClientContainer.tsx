import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import IClientList, { ClientUserInterface, ContactInterface } from '../interfaces/Client';
import { getClients, getFilteredClient } from '../services/clientsService';
import { ErrorContext } from '../context';
import { ClientFilters } from '../interfaces/ClientFilter';
import { async } from 'q';

const client: ContactInterface = {
  clientId: 1,
  email: '',
  firstName: '',
  id: 1,
  lastName: '',
  phone: '',
  title: '',
};

const user: ClientUserInterface = {
  email: '',
  firstName: '',
  id: 1,
  lastName: '',
};

const ClientList: IClientList[] = [
  {
    billingPlanTitle: '',
    clientContact: client,
    clientLogo: '',
    clientName: '',
    clientUser: user,
    id: 1,
    isActivated: true,
    noOfAssessments: 0,
    noOfEvaluators: 0,
    noOfParticipants: 0,
    phone: '',
  },
];

const ClientListContainer: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const errorContext = useContext(ErrorContext);
  const [clients, setClients] = useState(ClientList);
  const [filters, setFilters] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

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

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  async function applyFilterClients(filter: ClientFilters) {
    const param = { ...filter };
    toggleFilterModal();
    try {
      const data: any = await getFilteredClient(param);
      setClients(data);
    } catch (error) {
      errorContext.setError(error, true);
    }
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
      applyFilters={applyFilterClients}
      modalVisible={modalVisible}
      filtersClickHandler={filtersClickHandler}
      toggleFilterModal={toggleFilterModal}
    />
  );
};

export default withRouter(ClientListContainer);
