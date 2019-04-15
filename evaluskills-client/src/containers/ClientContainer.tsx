import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import ErrorContext from '../context/ErrorContext';
import IClientList, { ClientUserInterface, ContactInterface } from '../interfaces/Client';
import { ClientFilters } from '../interfaces/ClientFilter';
import { getClients, getFilteredClient } from '../services/clientsService';
import {
  InstrumentTemplateFilterInterface,
  InstrumentTemplateInterface,
} from '../modules/InstrumentTemplate/interface';
import { getInstrumentTemplateById } from '../modules/InstrumentTemplate/service';
import { isList } from '../utils/routerUtils';

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

const clients: IClientList[] = [];

interface State {
  clients: IClientList[];
  filters: ClientFilters;
  resetPager: boolean;
}
const defaultFilters: ClientFilters = {
  pageNumber: 1,
  pageSize: 10,
  // totalRecords: 10,
};

const ClientListContainer: React.FunctionComponent<RouteComponentProps> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);
  // const [clients, setClients] = useState(ClientList);
  const [clientFilters, setClientFilters] = useState(defaultFilters);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState<State>({
    clients,
    filters: defaultFilters,
    resetPager: false,
  });

  useEffect(() => {
    if (isList(match.path)) {
      fetchAllClients(state.filters);
    }
  }, [match.path, state.filters]);

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

  const onPageChange = (pageNumber: number) => {
    filterHandler({ pageNumber });
  };

  async function applyFilterClients(filter: ClientFilters) {
    filterHandler(filter);
    setModalVisible(false);
  }

  async function filterHandler(filters: ClientFilters) {
    const newFilterState = {
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
      resetPager: false,
    };
    if (!filters.pageNumber) {
      newFilterState.resetPager = true;
      newFilterState.filters.pageNumber = 1;
    }
    setState(newFilterState);
  }

  async function fetchAllClients(filters: ClientFilters) {
    try {
      const data: any = await getFilteredClient(filters);
      setState({ ...state, clients: data });
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
      clients={state.clients}
      filterClients={filterClients}
      add={addClient}
      remove={deleteClient}
      edit={editClient}
      applyFilters={applyFilterClients}
      modalVisible={modalVisible}
      onPageChange={onPageChange}
      filtersClickHandler={filtersClickHandler}
      toggleFilterModal={toggleFilterModal}
      appliedFilters={state.filters}
      resetPager={state.resetPager}
    />
  );
};

export default withRouter(ClientListContainer);
