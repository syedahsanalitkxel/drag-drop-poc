import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Spinner from '../components/atoms/Spinner';
import UsersList from '../components/pages/User';
import ErrorContext from '../context/ErrorContext';
import UsersInterface from '../interfaces/UserList';
import UsersFilterInterface from '../interfaces/UserFilter';
import { isAdd, isEdit, isList } from '../utils/routerUtils';
import RouteParamsInterface from '../interfaces/RouteParams';
import { addUser, editUser, getFilteredUser, getUserById, getUsers } from '../services/userService';
import { PageDetailsInterface } from '../api/ResponseInterface';
import FilterContext from '../components/organisms/ClientFilters/context';

const users: UsersInterface[] = [];

const user: UsersInterface = {
  email: '',
  firstName: '',
  lastName: '',
  id: 0,
};

const defaultFilters: UsersFilterInterface = {
  pageNumber: 1,
  pageSize: 10,
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
}

const UserListContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    filters: defaultFilters,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
    user,
    users,
  });

  useEffect(() => {
    console.log(state.filters);
    fetchAllUsers(state.filters);
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
  }

  async function fetchAllUsers(filters?: UsersFilterInterface) {
    try {
      const data = await getFilteredUser(filters);
      setState({ ...state, users: data, pageDetails: data.pageDetails });
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  async function fetchUserById(id: string) {
    try {
      const data = await getUserById(id);
      setState({ ...state, user: data });
    } catch (error) {
      errorContext.setError(error);
    }
  }

  // function filterUsers(searchQuery: string) {
  //   alert(searchQuery);
  // }

  // const filtersClickHandler = (event: React.MouseEvent) => {
  //     event.preventDefault();
  //     toggleFilterModal();
  // };

  // async function applyFilterUsers(filter: UsersFilterInterface) {
  //     const param = { ...filter };
  //     toggleFilterModal();
  //     try {
  //         const data: any = await getFilteredUser(param);
  //         setUsers(data);
  //     } catch (error) {
  //         errorContext.setError(error, true);
  //     }
  // }

  async function submitForm(values: any, action: string, id?: string) {
    if (action === 'Add') {
      try {
        const data = await addUser(values);
        history.push('/users');
      } catch (error) {
        errorContext.setError(error);
      }
    } else if (action === 'Edit' && id) {
      try {
        const data = await editUser(values, id);
        history.push('/users');
      } catch (error) {
        errorContext.setError(error);
      }
    }
  }

  //
  // function editUser(clientId: number) {
  //   history.push(`/clients/edit/${clientId}`);
  // }

  function deleteUser(clientId: number) {
    alert(`deleting => ${clientId}`);
  }

  function renderPage() {
    if (isEdit(match.params)) {
      // return <AddEditInstrumentTemplate defaultValue={state.instrumentTemplate} />;
    } else if (isAdd(match.path)) {
      // rseturn <AddEditInstrumentTemplate />;
    }
    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <UsersList
          Users={state.users}
          filterHandler={filterHandler}
          submitForm={submitForm}
          pageDetails={state.pageDetails || defaultPageDetail}
          resetPager={state.resetPager}
        />
      </FilterContext.Provider>
    );
  }

  return <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>;
};

export default withRouter(UserListContainer);
