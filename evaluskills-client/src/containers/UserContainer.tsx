import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import Spinner from '../components/atoms/Spinner';
import UsersList from '../components/pages/User';
import ErrorContext from '../context/ErrorContext';
import UsersInterface from '../interfaces/UserList';
import UsersFilterInterface from '../interfaces/UserFilter';
import { isList } from '../utils/routerUtils';
import RouteParamsInterface from '../interfaces/RouteParams';
import { addUser, clientLookUps, editUser, getFilteredUser } from '../services/userService';
import { PageDetailsInterface } from '../api/ResponseInterface';
import FilterContext from '../components/organisms/UserFilter/context';

const users: any[] = [];
const clientLookup: any = [];

const user: UsersInterface = {
  email: '',
  firstName: '',
  lastName: '',
  id: 0,
};

const defaultFilters: UsersFilterInterface = {
  clientId: '',
  pageNumber: 1,
  pageSize: 10,
  roleId: '',
};

const defaultPageDetail = {
  currentPage: defaultFilters.pageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

interface State {
  users: any;
  user: UsersInterface;
  filters: UsersFilterInterface;
  isLoading: boolean;
  pageDetails?: PageDetailsInterface;
  resetPager: boolean;
  clientLookup: any;
}

const UserListContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    clientLookup,
    filters: defaultFilters,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
    user,
    users,
  });

  useEffect(() => {
    if (isList(match.path)) {
      fetchAllUsers(state.filters);
    }
  }, [match.path, state.filters]);

  function filterHandler(filters: UsersFilterInterface) {
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

  async function fetchAllUsers(filters?: UsersFilterInterface) {
    try {
      setState({ ...state, isLoading: true });
      const lookup = await clientLookUps();
      const data: any = await getFilteredUser(filters);
      setState({
        ...state,
        clientLookup: lookup,
        isLoading: false,
        pageDetails: data.pageDetails,
        users: data.userData,
      });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function submitForm(values: any, action: string, id?: string) {
    if (action === 'Add') {
      try {
        const userData: any = await addUser(values);
        if (userData) {
          fetchAllUsers(defaultFilters);
        }
      } catch (error) {
        errorContext.setError(error, true);
      }
    } else if (action === 'Edit' && id) {
      try {
        const data = await editUser(values, id);
        if (data) {
          fetchAllUsers(defaultFilters);
        }
      } catch (error) {
        errorContext.setError(error, true);
      }
    }
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <UsersList
          Users={state.users}
          filterHandler={filterHandler}
          submitForm={submitForm}
          pageDetails={state.pageDetails || defaultPageDetail}
          resetPager={state.resetPager}
          savedSearch={state.filters.search}
          defaultFilters={defaultFilters}
          clientLookup={state.clientLookup}
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

export default withRouter(UserListContainer);
