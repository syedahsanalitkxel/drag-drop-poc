import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { isAdd, isEdit, isList } from '../../utils/routerUtils';
import { InstrumentTemplateInterface } from './interface';
import { getInstrumentTemplateById, getInstrumentTemplates } from './service';

const InstrumentTemplate = lazy(() => import('./list'));
const AddEditInstrumentTemplate = lazy(() => import('./addEdit'));

const instrumentTemplates: InstrumentTemplateInterface[] = [];
const instrumentTemplate: InstrumentTemplateInterface = {
  clientId: 1,
  isSystemDefined: false,
  recommendedApplicationId: 1,
  title: '',
};

interface State {
  instrumentTemplates: InstrumentTemplateInterface[];
  instrumentTemplate: InstrumentTemplateInterface;
}

const InstrumentTemplateContainer: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);
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
    history.push(`/instrument-templates${path}`);
  }

  function renderPage() {
    if (isEdit(match.params)) {
      return <AddEditInstrumentTemplate defaultValue={state.instrumentTemplate} />;
    } else if (isAdd(match.path)) {
      return <AddEditInstrumentTemplate />;
    }
    return (
      <InstrumentTemplate instrumentTemplates={state.instrumentTemplates} navigate={navigate} />
    );
  }

  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentTemplateContainer);
