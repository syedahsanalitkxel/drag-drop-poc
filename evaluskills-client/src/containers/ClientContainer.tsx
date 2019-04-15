import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import ErrorContext from '../context/ErrorContext';
import IClientList, { ClientUserInterface, ContactInterface } from '../interfaces/Client';
import { ClientFilters } from '../interfaces/ClientFilter';
import { getClients, getFilteredClient } from '../services/clientsService';

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

const defaultFilters: ClientFilters = {
  PageNumber: 1,
  pageSize: 10,
  totalRecords: 10,
};

const ClientListContainer: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const errorContext = useContext(ErrorContext);
  const [clients, setClients] = useState(ClientList);
  const [clientFilters, setClientFilters] = useState(defaultFilters);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchClients();
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

  const onPageChange = (PageNumber: number) => {
    applyFilterClients({ PageNumber });
  };

  async function applyFilterClients(filter: ClientFilters) {
    // const param = { ...filter };
    filterHandler(filter);
    setModalVisible(false);
  }

  async function filterHandler(filters: ClientFilters) {
    fetchAllClients({ ...clientFilters, ...filters });
  }

  async function fetchAllClients(filters: ClientFilters) {
    try {
      const data: any = await getFilteredClient(filters);
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
      onPageChange={onPageChange}
      filtersClickHandler={filtersClickHandler}
      toggleFilterModal={toggleFilterModal}
    />
  );
};

export default withRouter(ClientListContainer);
