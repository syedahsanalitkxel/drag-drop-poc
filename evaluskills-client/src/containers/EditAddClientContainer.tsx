import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AddAssessment from '../components/pages/AddAssessment';
import AssessmentItem from '../components/pages/AssessmentItem';
import { ErrorContext } from '../context';
import IAssessmentItem from '../interfaces/AssessmentItem';
import { getClients, getClientById } from '../services/clientsService';
import IClientList, { ClientUserInterface } from '../interfaces/AddEditClient';
import EditComponent from '../components/pages/EditClient';
import AddClient from '../components/pages/AddClient';
import RouteParams from '../interfaces/RouteParams';

const user: ClientUserInterface = {
  email: '',
  firstName: '',
  id: 1,
  lastName: '',
};

const ClientList: IClientList[] = [
  {
    address1: '',
    address2: '',
    billingPlanId: 1,
    city: '',
    clientContacts: [
      {
        clientId: 1,
        email: '',
        firstName: '',
        id: 1,
        lastName: '',
        phone: '',
        title: '',
      },
    ],
    clientLogo: '',
    clientName: '',
    clientTypeId: 0,
    clientUser: user,
    id: 1,
    phone: '',
    stateId: 0,
    subsidiary: '',
    zip: '',
  },
];

const AssessmentItemContainer: React.FunctionComponent<RouteComponentProps<RouteParams>> = ({
  match,
  history,
}) => {
  const errorContext = useContext(ErrorContext);
  const [clients, setClients] = useState(ClientList);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // fetchClients(match.params.id);
    return function cleanup() {
      setClients(ClientList);
      setFilters({});
    };
  }, []);

  async function fetchClients(id: string) {
    try {
      const data = await getClientById(id);
      setClients(ClientList);
    } catch (error) {
      errorContext.setError(error);
    }
  }

  function filterClients(searchQuery: string) {
    alert(searchQuery);
  }

  function addClients() {
    history.push('/client/add');
  }

  function editClients(clientId: string) {
    history.push(`/client/edit/${clientId}`);
  }

  function deleteClient(clientId: string) {
    alert(`deleting => ${clientId}`);
  }
  if (Object.getOwnPropertyNames(match.params).length > 0) {
    const clientData: any = fetchClients(match.params.id);
    return <AddClient defaultValues={clientData} action="edit" />;
  }
  return <AddClient action="add" defaultValues={ClientList} />;
};

export default withRouter(AssessmentItemContainer);
