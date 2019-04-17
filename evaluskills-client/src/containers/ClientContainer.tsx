import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ClientsList from '../components/pages/Client';
import ErrorContext from '../context/ErrorContext';
import IClientList, { ClientUserInterface, ContactInterface } from '../interfaces/Client';
import { ClientFilters } from '../interfaces/ClientFilter';
import { getClients, getFilteredClient } from '../services/clientsService';
import { isList } from '../utils/routerUtils';
import { PageDetailsInterface } from '../api/ResponseInterface';
import FilterContext from '../components/organisms/ClientFilters/context';
import Spinner from '../components/atoms/Spinner';

const clients: IClientList[] = [];

interface State {
  clients: IClientList[];
  filters: ClientFilters;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
  isLoading: boolean;
}
const defaultFilters: ClientFilters = {
  pageNumber: 1,
  pageSize: 10,
  billingPlanId: '',
  companyTypeId: '',
  statusId: '',
  // totalRecords: 10,
};

const defaultPageDetail = {
  currentPage: defaultFilters.pageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

const ClientListContainer: React.FunctionComponent<RouteComponentProps> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState<State>({
    clients,
    filters: defaultFilters,
    isLoading: false,
    pageDetails: defaultPageDetail,
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

  const applyFilterClients = (filter: ClientFilters) => {
    filterHandler(filter);
    setModalVisible(false);
  };

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
    if (!filters.search) {
      delete newFilterState.filters.search;
    }
    setState(newFilterState);
  }

  async function fetchAllClients(filters: ClientFilters) {
    try {
      const data: any = await getFilteredClient(filters);
      setState({ ...state, clients: data, pageDetails: data.pageDetails });
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
    <React.Suspense fallback={<Spinner />}>
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
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
          pageDetails={state.pageDetails || defaultPageDetail}
          appliedFilters={state.filters}
          resetPager={state.resetPager}
          defaultFilters={defaultFilters}
        />
      </FilterContext.Provider>
    </React.Suspense>
  );
};

export default withRouter(ClientListContainer);
