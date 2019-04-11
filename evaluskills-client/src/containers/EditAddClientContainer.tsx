import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AddAssessment from '../components/pages/AddAssessment';
import AssessmentItem from '../components/pages/AssessmentItem';
import { ErrorContext } from '../context';
import IAssessmentItem from '../interfaces/AssessmentItem';
import { getClients, getClientById, addClient } from '../services/clientsService';
import IClientList, { ClientUserInterface } from '../interfaces/AddEditClient';
import EditComponent from '../components/pages/EditClient';
import AddClient from '../components/pages/AddClient';
import RouteParams from '../interfaces/RouteParams';
import { async } from 'q';
const user: ClientUserInterface = {
  email: '',
  firstName: '',
  id: 1,
  lastName: '',
};

const ClientList: IClientList = {
  address1: '',
  address2: '',
  billingPlanId: 1,
  city: '',
  clientContacts: [
    {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      title: '',
    },
  ],
  clientName: '',
  clientTypeId: 0,
  clientUser: user,
  id: 1,
  phone: '',
  stateId: 0,
  subsidiary: '',
  zip: '',
};

const AssessmentItemContainer: React.FunctionComponent<RouteComponentProps<RouteParams>> = ({
  match,
  history,
}) => {
  const errorContext = useContext(ErrorContext);
  const [clients, setClients] = useState(ClientList);
  const [filters, setFilters] = useState({});
  const [action, setAction] = useState('add');

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

  function buildFormData(formData: any, data: any, parentKey?: any) {
    if (data && typeof data === 'object' && !(data instanceof FileList)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }

  function jsonToFormData(data: any) {
    const formData = new FormData();

    buildFormData(formData, data);

    return formData;
  }

  async function submitForm(values: any) {
    console.log(values);
    await delete values.id;
    await delete values.clientUser.id;
    const formd: FormData = jsonToFormData(values);
    await formd.append('clientLogo', values.clientLogo);
    if (action === 'add') {
      try {
        const data = await addClient(formd);
        setClients(ClientList);
        setAction('');
        history.push('/clients');
        // setClients(ClientList);
      } catch (error) {
        errorContext.setError(error);
      }
    }
  }

  if (Object.getOwnPropertyNames(match.params).length > 0) {
    const clientData: any = fetchClients(match.params.id);
    return <AddClient defaultValues={clientData} action="edit" changeListener={submitForm} />;
  }
  return <AddClient action={action} defaultValues={clients} changeListener={submitForm} />;
};

export default withRouter(AssessmentItemContainer);
