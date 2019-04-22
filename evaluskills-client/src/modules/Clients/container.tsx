import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
const ClientsList = lazy(() => import('./list'));
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import IClientList from './clientListInterface';
import { ClientFilters } from './clientFilterInterface';
import { deleteClient, getFilteredClient } from './service';
import { isList } from '../../utils/routerUtils';
import { PageDetailsInterface } from '../../api/ResponseInterface';
import FilterContext from './context';
import Spinner from '../../components/atoms/Spinner';
import { isWhiteSpace } from 'tslint';

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
    setState(newFilterState);
  }

  async function fetchAllClients(filters: ClientFilters) {
    try {
      setState({ ...state, isLoading: true });
      const data: any = await getFilteredClient(filters);
      setState({ ...state, clients: data.clientsData, isLoading: false, pageDetails: data.pageDetails });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  function addClient() {
    history.push('/clients/add');
  }

  function editClient(clientId: number) {
    history.push(`/clients/edit/${clientId}`);
  }

  async function removeClient(clientId: number) {
    try {
      setState({ ...state, isLoading: true });
      const clientData: any = await deleteClient(clientId);
      if (clientData) {
        fetchAllClients(defaultFilters);
      }
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <ClientsList
          clients={state.clients}
          filterClients={filterClients}
          add={addClient}
          remove={removeClient}
          edit={editClient}
          applyFilters={applyFilterClients}
          modalVisible={modalVisible}
          onPageChange={onPageChange}
          filtersClickHandler={filtersClickHandler}
          toggleFilterModal={toggleFilterModal}
          pageDetails={state.pageDetails || defaultPageDetail}
          appliedFilters={state.filters}
          savedSearch={state.filters.keyword}
          resetPager={state.resetPager}
          defaultFilters={defaultFilters}
        />
      </FilterContext.Provider>
    );
  }

  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(ClientListContainer);
