import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { isAdd, isEdit, isList } from '../../utils/routerUtils';
import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';
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
const defaultFilters: InstrumentTemplateFilterInterface = {
  PageNumber: 1,
};

interface State {
  instrumentTemplates: InstrumentTemplateInterface[];
  instrumentTemplate: InstrumentTemplateInterface;
  filters: InstrumentTemplateFilterInterface;
}
// TODO: Check user role. If use role is client admin, he can't edit instruments created by super admin
const InstrumentTemplateContainer: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    instrumentTemplate,
    instrumentTemplates,
    filters: defaultFilters,
  });

  useEffect(() => {
    if (isEdit(match.params)) {
      fetchInstrument(match.params.id);
    } else if (isList(match.path)) {
      fetchAllInstruments(defaultFilters);
    }
  }, [match.path]);

  function filterHandler(filters: InstrumentTemplateFilterInterface) {
    fetchAllInstruments({ ...state.filters, ...filters });
  }

  async function fetchAllInstruments(filters?: InstrumentTemplateFilterInterface) {
    try {
      const data = await getInstrumentTemplates(filters);
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
      <InstrumentTemplate
        instrumentTemplates={state.instrumentTemplates}
        navigate={navigate}
        filterHandler={filterHandler}
      />
    );
  }

  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentTemplateContainer);
