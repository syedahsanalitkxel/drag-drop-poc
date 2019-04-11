import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import ErrorContext from '../../../context/ErrorContext';
import LookupContext from '../../../context/LookupContext';
import RouteParamsInterface from '../../../interfaces/RouteParams';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { InstrumentTemplateInterface } from './interface';
import { getInstrumentTemplateById, getInstrumentTemplates } from './service';
import { isEdit, isList } from '../../../utils/routerUtils';

const instrumentTemplates: InstrumentTemplateInterface[] = [];
const instrumentTemplate: InstrumentTemplateInterface = {
  clientId: 1,
  isSystemDefined: false,
  recommendedApplicationId: 1,
  title: '',
};

interface State {
  instrumentTemplates?: InstrumentTemplateInterface[];
  instrumentTemplate?: InstrumentTemplateInterface;
}

const InstrumentTemplate: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);
  const lookupContext = useContext(LookupContext);
  const [state, setState] = useState<State>({ instrumentTemplate, instrumentTemplates });

  useEffect(() => {
    if (isEdit(match.params)) {
      fetchInstrument(match.params.id);
    } else if (isList(match.path)) {
      fetchAllInstruments();
    }
  }, [match.path]);

  async function fetchAllInstruments() {
    try {
      const data = await getInstrumentTemplates();
      setState({ ...state, instrumentTemplates: data });
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  async function fetchInstrument(id: string) {
    try {
      const data = await getInstrumentTemplateById(id);
      setState({ ...state, instrumentTemplate: data });
    } catch (error) {
      errorContext.setError(error);
    }
  }

  function updateInstrument() {}
  function deleteInstrument() {}

  function navigate(path: string) {
    history.push(`/instrument${path}`);
  }

  return (
    <DashboardTemplate>
      <h1>Instrument Container</h1>
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentTemplate);
