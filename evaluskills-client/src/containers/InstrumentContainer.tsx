import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Spinner from '../components/atoms/Spinner';
import AddEditInstrumentTemplate from '../components/pages/AddEditInstrumentTemplate';
import InstrumentTemplate from '../components/pages/InstrumentTemplate';
import ErrorContext from '../context/ErrorContext';
import LookupContext from '../context/LookupContext';
import InstrumentTemplateInterface from '../interfaces/InstrumentTemplate';
import RouteParamsInterface from '../interfaces/RouteParams';
import {
  getInstrumentTemplateById,
  getInstrumentTemplates,
} from '../services/instrumentTemplateService';
import { isAdd, isEdit, isList } from '../utils/routerUtils';
import DashboardTemplate from '../components/templates/DashboardTemplate';

const InstrumentTemplates: InstrumentTemplateInterface[] = [];

const InstrumentTemplateContainer: React.FunctionComponent<
  RouteComponentProps<RouteParamsInterface>
> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);
  const lookupContext = useContext(LookupContext);

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
      errorContext.setError(error, true);
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

  function addInstrumental() {
    history.push('/addInstrumental');
  }

  function editInstrumentTemplate(instrumentTemplate: string) {
    history.push(`/instrument-templates/edit/${instrumentTemplate}`);
  }

  function deleteInstrumentTemplate(instrumentTemplate: string) {
    alert(`deleting => ${instrumentTemplate}`);
  }

  if (isEdit(match.params)) {
    if (Object.keys(selectedTemplate).length > 0) {
      return <AddEditInstrumentTemplate defaultValues={selectedTemplate} />;
    }
    return <Spinner />;
  }

  if (isAdd(match.path)) {
    return <AddEditInstrumentTemplate />;
  }

  return (
    <DashboardTemplate>
      <LookupContext.Consumer>
        {lookup => {
          console.log('-->', lookup);
          return <h1>Hey</h1>;
        }}
      </LookupContext.Consumer>
      <InstrumentTemplate
        instrumentTemplates={usersData}
        add={addInstrumentTemplate}
        edit={editInstrumentTemplate}
        remove={deleteInstrumentTemplate}
        filterInstrumentTemplates={fetchInstrumentTemplates}
        addInstrument={addInstrumental}
      />
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentTemplateContainer);
