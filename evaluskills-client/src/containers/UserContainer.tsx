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

interface State {
  users: UsersInterface[];
  user: UsersInterface;
  filters: UsersFilterInterface;
}

const UserListContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({
  history,
  match,
}) => {
  const errorContext = useContext(ErrorContext);
  // const [users, setUsers] = useState(initialState);
  const [state, setState] = useState<State>({
    filters: defaultFilters,
    user,
    users,
  });

  useEffect(() => {
    if (isEdit(match.params)) {
      fetchUserById(match.params.id);
    } else if (isList(match.path)) {
      fetchAllUsers(defaultFilters);
    }
  }, [match.path]);

  function filterHandler(filters: UsersFilterInterface) {
    fetchAllUsers({ ...state.filters, ...filters });
  }

  async function fetchAllUsers(filters?: UsersFilterInterface) {
    try {
      const data = await getFilteredUser(filters);
      setState({ ...state, users: data });
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
    return <UsersList Users={state.users} filterHandler={filterHandler} submitForm={submitForm} />;
  }

  return <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>;
};

export default withRouter(UserListContainer);
