import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AddEditInstrumentTemplate from '../components/pages/AddEditInstrumentTemplate';
import ClientInstrumentTemplate from '../components/pages/ClientInstrumentTemplate';
import { ErrorContext } from '../context';
import InstrumentTemplateInterface from '../interfaces/InstrumentTemplate';
import RouteParamsInterface from '../interfaces/RouteParams';
import {
  getInstrumentTemplateById,
  getInstrumentTemplates,
} from '../services/instrumentTemplateService';
import { isAdd, isEdit, isList } from '../utils/routerUtils';

const InstrumentTemplates: InstrumentTemplateInterface[] = [];

const InstrumentTemplateContainer: React.FunctionComponent<
  RouteComponentProps<RouteParamsInterface>
> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);

  const [instrumentTemplates, setInstrumentTemplates] = useState(InstrumentTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const usersData = [
    {
      id: '1',
      title: 'It is a long established fact that a reader will be distracted',
      assessmentItemsCount: 5,
      competencyCount: 4,
      influentialCount: 11,
      rationalCount: 8,
      faithBasedCount: 9,
    },
    {
      id: '2',
      title: 'It is a long established fact that a reader will be distracted',
      assessmentItemsCount: 5,
      competencyCount: 4,
      influentialCount: 11,
      rationalCount: 8,
      faithBasedCount: 9,
    },
    {
      id: '3',
      title: 'It is a long established fact that a reader will be distracted',
      assessmentItemsCount: 5,
      competencyCount: 4,
      influentialCount: 11,
      rationalCount: 8,
      faithBasedCount: 9,
    },
    {
      id: '4',
      title: 'It is a long established fact that a reader will be distracted',
      assessmentItemsCount: 5,
      competencyCount: 4,
      influentialCount: 11,
      rationalCount: 8,
      faithBasedCount: 9,
    },
  ];

  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    if (isEdit(match.params)) {
      fetchInstrumentTemplateById(match.params.id);
    } else if (isList(match.path)) {
      fetchInstrumentTemplates();
    }

    return function cleanup() {
      setInstrumentTemplates(InstrumentTemplates);
      setSelectedTemplate({});
    };
  }, [match.path]);

  async function fetchInstrumentTemplates() {
    try {
      const data = await getInstrumentTemplates();
      setInstrumentTemplates(data);
    } catch (error) {
      // TODO: Implement Error boundary in future;
      errorContext.setError(error);
    }
  }

  async function fetchInstrumentTemplateById(id: string) {
    try {
      const data = await getInstrumentTemplateById(id);
      setSelectedTemplate(data);
    } catch (error) {
      errorContext.setError(error);
    }
  }

  function filterInstrumentTemplates(searchQuery: string) {
    alert(searchQuery);
  }

  function addInstrumentTemplate() {
    history.push('/instrument-templates/add');
  }

  function editInstrumentTemplate(instrumentTemplate: string) {
    history.push(`/instrument-templates/edit/${instrumentTemplate}`);
  }

  function deleteInstrumentTemplate(instrumentTemplate: string) {
    alert(`deleting => ${instrumentTemplate}`);
  }

  if (isEdit(match.params)) {
    return <AddEditInstrumentTemplate defaultValues={selectedTemplate} />;
  }

  if (isAdd(match.path)) {
    return <AddEditInstrumentTemplate />;
  }

  return (
    <ClientInstrumentTemplate
      instrumentTemplates={usersData}
      add={addInstrumentTemplate}
      edit={editInstrumentTemplate}
      remove={deleteInstrumentTemplate}
      filterInstrumentTemplates={fetchInstrumentTemplates}
    />
  );
};

export default withRouter(InstrumentTemplateContainer);
