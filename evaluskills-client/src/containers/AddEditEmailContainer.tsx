import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AddEmailTemplate from '../components/pages/AddEmailTemplate';
import EmailListing from '../components/pages/EmailListing';
import ErrorContext from '../context/ErrorContext';
import InstrumentTemplateInterface from '../interfaces/InstrumentTemplate';
import RouterPropsInterface from '../interfaces/RouteParams';
import { getInstrumentTemplates } from '../services/instrumentTemplateService';
import { isAdd, isEdit, isList } from '../utils/routerUtils';

const InstrumentTemplates: InstrumentTemplateInterface[] = [];

const InstrumentTemplateContainer: React.FunctionComponent<
  RouteComponentProps<RouterPropsInterface>
> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);

  const [instrumentTemplates, setInstrumentTemplates] = useState(InstrumentTemplates);
  const usersData = [
    { id: 1, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
    { id: 2, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
    { id: 3, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
    { id: 4, title: 'Evaluation complete', type: 'Lorem Ipsum', systemName: 'Lorem Ipsum' },
  ];
  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    if (isEdit(match.params)) {
      console.log('edit');
      // fetch single assignment
    } else if (isList(match.path)) {
      console.log('list');
      fetchInstruments();
    } else {
      console.log('add');
    }

    return function cleanup() {
      setInstrumentTemplates(InstrumentTemplates);
    };
  }, [setInstrumentTemplates]);

  async function fetchInstruments() {
    try {
      const data = await getInstrumentTemplates();
      setInstrumentTemplates(data);
    } catch (error) {
      // TODO: Implement Error boundary in future;
      errorContext.setError(error);
    }
  }

  function filterInstrumentTemplates(searchQuery: string) {
    alert(searchQuery);
  }

  function addInstrumentTemplate() {
    history.push('/email/add');
  }

  function editInstrumentTemplate(instrumentTemplate: number) {
    history.push(`/email/edit/${instrumentTemplate}`);
  }

  function deleteInstrumentTemplate(instrumentTemplate: string) {
    alert(`deleting => ${instrumentTemplate}`);
  }

  if (isEdit(match.params)) {
    return <AddEmailTemplate edit={true} />;
  }

  if (isAdd(match.path)) {
    return <AddEmailTemplate />;
  }

  return (
    <EmailListing
      emailTemplates={usersData}
      add={addInstrumentTemplate}
      edit={editInstrumentTemplate}
      remove={deleteInstrumentTemplate}
      filteremailTemplates={fetchInstruments}
    />
  );
};

export default withRouter(InstrumentTemplateContainer);
