import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { pickBy, identity } from 'lodash-es';

import { PageDetailsInterface } from '../../api/ResponseInterface';
import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { isAdd, isEdit, isList } from '../../utils/routerUtils';
import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';
import { getInstrumentTemplateById, getInstrumentTemplates } from './service';
import FilterContext from './context';
import { USER_ROLE } from '../../utils';

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
  PageSize: 10,
  Status: 'all',
};

interface State {
  instrumentTemplates: InstrumentTemplateInterface[];
  instrumentTemplate: InstrumentTemplateInterface;
  filters: InstrumentTemplateFilterInterface;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
}

const defaultPageDetail = {
  currentPage: defaultFilters.PageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

// TODO: Check user role. If use role is client admin, he can't edit instruments created by super admin
const InstrumentTemplateContainer: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    filters: defaultFilters,
    instrumentTemplate,
    instrumentTemplates,
    pageDetails: defaultPageDetail,
    resetPager: false,
  });

  useEffect(() => {
    if (isEdit(match.params)) {
      fetchInstrument(match.params.id);
    } else if (isList(match.path)) {
      fetchAllInstruments(state.filters);
    }
  }, [match.path, state.filters]);

  function filterHandler(filters: InstrumentTemplateFilterInterface) {
    const newFilterState = {
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
      resetPager: false,
    };
    if (!filters.PageNumber) {
      newFilterState.resetPager = true;
      newFilterState.filters.PageNumber = 1;
    }
    if (!filters.Search) {
      delete newFilterState.filters.Search;
    }
    if (!filters.recommendedApplicationId) {
      delete newFilterState.filters.recommendedApplicationId;
    }
    if (USER_ROLE.isSuperAdmin()) {
      delete newFilterState.filters.Status;
    }
    setState(newFilterState);
  }

  async function fetchAllInstruments(filters?: InstrumentTemplateFilterInterface) {
    try {
      const allTemplates = await getInstrumentTemplates(filters);
      setState({
        ...state,
        instrumentTemplates: allTemplates.data,
        pageDetails: allTemplates.pageDetails,
      });
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
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <InstrumentTemplate
          instrumentTemplates={state.instrumentTemplates}
          navigate={navigate}
          filterHandler={filterHandler}
          pageDetails={state.pageDetails || defaultPageDetail}
          resetPager={state.resetPager}
        />
      </FilterContext.Provider>
    );
  }

  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentTemplateContainer);
