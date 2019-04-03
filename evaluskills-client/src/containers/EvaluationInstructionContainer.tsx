import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AddEditInstructionTemplate from '../components/pages/AddInstructions';

import InstructionListTemplate from '../components/pages/InstructionListTemplate';
import { ErrorContext } from '../context';
import { Instructions } from '../interfaces/Instructions';
import RouterPropsInterface from '../interfaces/RouteParams';
import { getInstrumentTemplates } from '../services/instrumentTemplateService';
import { isAdd, isEdit, isList } from '../utils/routerUtils';

const InstrumentTemplates: Instructions[] = [];

const InstrumentTemplateContainer: React.FunctionComponent<
  RouteComponentProps<RouterPropsInterface>
> = ({ history, match }) => {
  const errorContext = useContext(ErrorContext);

  const [instrumentTemplates, setInstrumentTemplates] = useState(InstrumentTemplates);
  const usersData = [
    { id: 1, title: 'Evaluation complete', detail: 'Evaluation complete' },
    { id: 2, title: 'Evaluation complete', detail: 'Evaluation complete' },
    { id: 3, title: 'Evaluation complete', detail: 'Evaluation complete' },
    { id: 4, title: 'Evaluation complete', detail: 'Evaluation complete' },
  ];
  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    if (isEdit(match.params)) {
      console.log('edit');
      // fetch single assignment
    } else if (isList(match.path)) {
      console.log('list');
      //fetchInstruments();
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
      // setInstrumentTemplates(data);
    } catch (error) {
      // TODO: Implement Error boundary in future;
      errorContext.setError(error);
    }
  }

  function filterInstrumentTemplates(searchQuery: string) {
    alert(searchQuery);
  }

  function addInstrumentTemplate() {
    history.push('/evaluation-instructions/add');
  }

  function editInstrumentTemplate(instrumentTemplate: number) {
    history.push(`/evaluation-instructions/edit/${instrumentTemplate}`);
  }

  function deleteInstrumentTemplate(instrumentTemplate: string) {
    alert(`deleting => ${instrumentTemplate}`);
  }

  if (isEdit(match.params)) {
    return <AddEditInstructionTemplate />;
  }

  if (isAdd(match.path)) {
    return <AddEditInstructionTemplate />;
  }

  return (
    <InstructionListTemplate
      InstrcutionsTemplate={usersData}
      add={addInstrumentTemplate}
      edit={editInstrumentTemplate}
      filterInstrcutionsTemplates={fetchInstruments}
    />
  );
};

export default withRouter(InstrumentTemplateContainer);
