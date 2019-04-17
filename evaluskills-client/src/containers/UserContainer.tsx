import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Spinner from '../components/atoms/Spinner';
import UsersList from '../components/pages/User';
import ErrorContext from '../context/ErrorContext';
import UsersInterface from '../interfaces/UserList';
import UsersFilterInterface from '../interfaces/UserFilter';
import { isAdd, isEdit, isList } from '../utils/routerUtils';
import RouteParamsInterface from '../interfaces/RouteParams';
import { addUser, clientLookUps, editUser, getFilteredUser, getUserById, getUsers } from '../services/userService';
import { PageDetailsInterface } from '../api/ResponseInterface';
import FilterContext from '../components/organisms/UserFilter/context';
import { LookupInterface } from '../modules/Lookup/interface';

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
    if (!filters.search) {
      delete newFilterState.filters.search;
    }
    setState(newFilterState);
  }

  async function fetchAllUsers(filters?: UsersFilterInterface) {
    try {
      const lookup = await clientLookUps();
      const data = await getFilteredUser(filters);
      setState({ ...state, users: data, pageDetails: data.pageDetails, clientLookup: lookup });
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  async function submitForm(values: any, action: string, id?: string) {
    if (action === 'Add') {
      try {
        const data = await addUser(values);
        setState({ ...state, users: { ...state.users, values } });
        location.reload();
      } catch (error) {
        errorContext.setError(error);
      }
    } else if (action === 'Edit' && id) {
      try {
        const data = await editUser(values, id);
        location.reload();
      } catch (error) {
        errorContext.setError(error);
      }
    }
  }

  function renderPage() {
    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        {state.users.length > 0 && (
          <UsersList
            Users={state.users}
            filterHandler={filterHandler}
            submitForm={submitForm}
            pageDetails={state.pageDetails || defaultPageDetail}
            resetPager={state.resetPager}
            defaultFilters={defaultFilters}
            clientLookup={state.clientLookup}
          />
        )}
      </FilterContext.Provider>
    );
  }

  return <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>;
};

export default withRouter(UserListContainer);
