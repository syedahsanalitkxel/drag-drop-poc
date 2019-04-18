import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IClientList, { ClientUserInterface } from './addClientInterface';
import { addClient, editClient, getClientById } from './service';

import Spinner from '../../components/atoms/Spinner';
import AddClient from './addClient';
import ErrorContext from '../../context/ErrorContext';
import editClientInterface from './editClientInterface';
import RouteParams from '../../interfaces/RouteParams';
import { isAdd, isEdit, isList } from '../../utils/routerUtils';

const user: ClientUserInterface = {
  email: '',
  firstName: '',
  id: 1,
  lastName: '',
};

const ClientList = {
  address1: '',
  address2: '',
  billingPlanId: '',
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
  clientLogo: undefined,
  clientName: '',
  clientTypeId: '',
  clientUser: user,
  id: 1,
  phone: '',
  stateId: '',
  subsidiary: '',
  zip: '',
};
const selectedClient: editClientInterface = {};
const AssessmentItemContainer: React.FunctionComponent<RouteComponentProps<RouteParams>> = ({ match, history }) => {
  const errorContext = useContext(ErrorContext);
  const [clients, setClients] = useState(ClientList);
  const [selectedClients, setSelectedClients] = useState(selectedClient);
  const [filters, setFilters] = useState({});
  const [action, setAction] = useState('Add');

  useEffect(() => {
    if (isEdit(match.params)) {
      fetchClients(match.params.id);
    }
    if (isAdd(match.path)) {
      setClients(ClientList);
    }
    return function cleanup() {
      setClients(ClientList);
      setFilters({});
    };
  }, [match.path]);

  async function fetchClients(id: string) {
    try {
      const data: any = await getClientById(id);
      delete data.clientLogo;
      setSelectedClients(data);
      setAction('Edit');
    } catch (error) {
      errorContext.setError(error);
    }
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
    if (action === 'Add') {
      await delete values.id;
      await delete values.clientUser.id;
      const formd: FormData = jsonToFormData(values);
      await formd.append('clientLogo', values.clientLogo);
      try {
        const data = await addClient(formd);
        if (values.addMore) {
          location.reload();
        } else if (!data.fail) {
          setClients(ClientList);
          setAction('');
          history.push('/clients');
        }
      } catch (error) {
        errorContext.setError(error);
      }
    } else if (action === 'Edit') {
      const formd: FormData = jsonToFormData(values);
      await formd.append('clientLogo', values.clientLogo);
      try {
        await editClient(formd, match.params.id);
        setClients(ClientList);
        setAction('');
        history.push('/clients');
      } catch (error) {
        errorContext.setError(error);
      }
    }
  }

  function cancelForm() {
    history.push('/clients');
  }

  if (isEdit(match.params)) {
    if (Object.keys(selectedClients).length > 0) {
      return (
        <AddClient defaultValues={selectedClients} action="Edit" changeListener={submitForm} cancelForm={cancelForm} />
      );
    }
  }

  if (isAdd(match.path)) {
    return <AddClient action={action} defaultValues={clients} changeListener={submitForm} cancelForm={cancelForm} />;
  }

  return <Spinner />;
};

export default withRouter(AssessmentItemContainer);
