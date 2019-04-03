import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AddEditInstrumentTemplate from '../components/pages/AddEditInstrumentTemplate';
import InstrumentTemplate from '../components/pages/InstrumentTemplate';
import { ErrorContext } from '../context';
import InstrumentTemplateInterface from '../interfaces/InstrumentTemplate';
import RouterPropsInterface from '../interfaces/RouterPropsInterface';
import { getInstrumentTemplates } from '../services/instrumentTemplateService';
import { isAdd, isEdit, isList } from '../utils/routerUtils';

const InstrumentTemplates: InstrumentTemplateInterface[] = [];

const InstrumentTemplateContainer: React.FunctionComponent<
  RouteComponentProps<RouterPropsInterface>
> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);

  const [instrumentTemplates, setInstrumentTemplates] = useState(InstrumentTemplates);

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
    history.push('/instrument-templates/add');
  }

  function editInstrumentTemplate(instrumentTemplate: string) {
    history.push(`/instrument-templates/edit/${instrumentTemplate}`);
  }

  function deleteInstrumentTemplate(instrumentTemplate: string) {
    alert(`deleting => ${instrumentTemplate}`);
  }

  if (isEdit(match.params)) {
    return <AddEditInstrumentTemplate />;
  }

  if (isAdd(match.path)) {
    return <AddEditInstrumentTemplate />;
  }

  return (
    <InstrumentTemplate
      instrumentTemplates={instrumentTemplates}
      add={addInstrumentTemplate}
      edit={editInstrumentTemplate}
      remove={deleteInstrumentTemplate}
      filterInstrumentTemplates={fetchInstruments}
    />
  );
};

export default withRouter(InstrumentTemplateContainer);
