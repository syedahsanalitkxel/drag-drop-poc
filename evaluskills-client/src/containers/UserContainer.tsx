import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import UsersList from '../components/pages/User';
import ErrorContext from '../context/ErrorContext';
import UsersInterface from '../interfaces/UserList';
import UsersFilterInterface from '../interfaces/UserFilter';

const initialState: any[] = [
  {
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
  },
];

// const usersData = [
//     { id: '1', firstName: 'Robby', lastName: 'Rash', role: 'Admin', email: 'robbyrash@gmail.com' },
//     { id: '2', firstName: 'Jhon', lastName: 'Doe', role: 'User', email: 'jhondoe@gmail.com' },
//     {
//         id: '3',
//         firstName: 'Bella',
//         lastName: 'William',
//         role: 'Admin',
//         email: 'bellawilliam@gmail.com',
//     },
//     { id: '4', firstName: 'Rash', lastName: 'Rash', role: 'User', email: 'rockrash@gmail.com' },
// ];

const UserListContainer: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const errorContext = useContext(ErrorContext);
  const [users, setUsers] = useState(initialState);

  useEffect(() => {
    // fetchClients();
    return function cleanup() {
      setUsers(initialState);
    };
  }, []);
  //
  // async function fetchClients() {
  //     try {
  //         const data = await getUsers();
  //         setUsers(data);
  //     } catch (error) {
  //         errorContext.setError(error, true);
  //     }
  // }

  function filterUsers(searchQuery: string) {
    alert(searchQuery);
  }

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

  function addUser() {
    history.push('/clients/add');
  }

  function editUser(clientId: number) {
    history.push(`/clients/edit/${clientId}`);
  }

  function deleteUser(clientId: number) {
    alert(`deleting => ${clientId}`);
  }

  return <UsersList Users={users} />;
};

export default withRouter(UserListContainer);
